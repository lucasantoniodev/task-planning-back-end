import { UseFilters, UseGuards } from '@nestjs/common';
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
import { CreateTasksRequestDto } from '../../task/dtos/request/create-tasks-request.dto';
import { CreateTaskService } from '../../task/services/create-task.service';
import { FindAllTasksService } from '../../task/services/find-all-tasks.service';
import { UserResponseDto } from '../../user/dtos/response/user.response.dto';
import { FindTaskByIdService } from '../../task/services/find-task-by-id.service';
import { Player } from '../interfaces/player.interface';
import { TaskStatusEnum } from '../../task/enums/task-status.enum';

type TaskState = {
  id: string;
  status: TaskStatusEnum;
  votes: { userId: string; vote: number }[];
  players: Player[];
};

@UseGuards(FirebaseAuthGuard)
@UseFilters(PlanningRoomExceptionFilter)
@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer() server: Server;

  private taskState = new Map<string, TaskState>();

  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly findAllTasksService: FindAllTasksService,
    private readonly findTaskByIdService: FindTaskByIdService,
  ) {}

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
      };

      this.taskState.set(taskId, task);
    }

    const isPlayerJoined = !!task.players.find(
      (player) => player.id === user.id,
    );

    if (!isPlayerJoined) {
      task.players.push({
        id: user.id,
        name: user.name,
        photoUrl: user.photoUrl,
        joinedAt: Date.now(),
      });
    }

    this.server.to(taskId).emit(`room:task:${taskId}`, task);
  }

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
      this.server.to(taskId).emit(`room:task:${taskId}`, task);
    }
  }

  @SubscribeMessage('room:task:create')
  async createTask(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateTasksRequestDto,
  ) {
    await this.createTaskService.execute(payload);

    const tasks = await this.findAllTasksService.execute({
      planningRoomId: payload.planningRoomId,
    });

    client.emit('room:task:created', { message: 'Task criada com sucesso!' });

    this.server.to(payload.planningRoomId).emit('room:task:list', tasks);
  }
}
