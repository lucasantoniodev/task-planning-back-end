import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../../../guards/firebase-auth/firebase-auth.guard';
import { PlanningRoomExceptionFilter } from './planning-room-exception.filter';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateTaskService } from '../../task/services/create-task.service';
import { FindAllTasksService } from '../../task/services/find-all-tasks.service';
import { UserResponseDto } from '../../user/dtos/response/user.response.dto';
import { FindTaskByIdService } from '../../task/services/find-task-by-id.service';
import { Player } from '../interfaces/player.interface';
import { TaskStatusEnum } from '../../task/enums/task-status.enum';

type Vote = {
  userUid: string;
  vote: number;
};

type TaskState = {
  id: string;
  status: TaskStatusEnum;
  votes: Vote[];
  players: Player[];
  revealed?: boolean;
};

@UseGuards(FirebaseAuthGuard)
@UseFilters(PlanningRoomExceptionFilter)
@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(TaskGateway.name);

  private taskState = new Map<string, TaskState>();

  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly findAllTasksService: FindAllTasksService,
    private readonly findTaskByIdService: FindTaskByIdService,
  ) {}

  // ✅ Entrar na task
  @SubscribeMessage('room:task:join')
  async joinTask(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { taskId: string },
  ) {
    const { taskId } = payload;
    const user: UserResponseDto = client.data.user;

    const taskEntity = await this.findTaskByIdService.execute(taskId);
    if (!taskEntity) {
      throw new WsException(`Task with ID: ${taskId} does not exist`);
    }

    await client.join(taskId);

    let task = this.taskState.get(taskId);
    if (!task) {
      task = {
        id: taskId,
        votes: [],
        status: TaskStatusEnum.PENDING,
        players: [],
        revealed: false,
      };
      this.taskState.set(taskId, task);
    }

    const isPlayerJoined = task.players.some((p) => p.id === user.id);
    if (!isPlayerJoined) {
      task.players.push({
        id: user.id,
        uid: user.uid,
        name: user.name,
        photoUrl: user.photoUrl,
        joinedAt: Date.now(),
      });
    }

    this.server.to(taskId).emit(`room:task:${taskId}`, task);
  }

  // ✅ Sair da task
  @SubscribeMessage('room:task:leave')
  async leaveTask(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { taskId: string },
  ) {
    const { taskId } = payload;
    const user: UserResponseDto = client.data.user;

    await client.leave(taskId);

    const task = this.taskState.get(taskId);
    if (task) {
      task.players = task.players.filter((player) => player.id !== user.id);
      task.votes = task.votes.filter((v) => v.userUid !== user.uid);
      this.server.to(taskId).emit(`room:task:${taskId}`, task);
    }
  }

  @SubscribeMessage('room:task:vote')
  voteTask(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { taskId: string; value: number },
  ) {
    const { taskId, value } = payload;
    const user: UserResponseDto = client.data.user;

    const task = this.taskState.get(taskId);
    if (!task) {
      throw new WsException(`Task ${taskId} not found`);
    }

    const existingVote = task.votes.find((v) => v.userUid === user.uid);
    if (existingVote) {
      existingVote.vote = value;
    } else {
      task.votes.push({ userUid: user.uid, vote: value });
    }

    this.logger.debug(`${user.name} votou ${value} na task ${taskId}`);

    this.server.to(taskId).emit(`room:task:${taskId}`, task);
  }

  @SubscribeMessage('room:task:reveal')
  revealTask(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { taskId: string },
  ) {
    const { taskId } = payload;
    const user: UserResponseDto = client.data.user;

    const task = this.taskState.get(taskId);
    if (!task) {
      throw new WsException(`Task ${taskId} not found`);
    }

    task.revealed = true;

    this.logger.debug(`${user.name} revelou os votos da task ${taskId}`);

    this.server.to(taskId).emit(`room:task:${taskId}`, task);
  }
}
