import { UseFilters, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../../../guards/firebase-auth/firebase-auth.guard';
import { PlanningRoomExceptionFilter } from './planning-room-exception.filter';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateTasksRequestDto } from '../../task/dtos/request/create-tasks-request.dto';
import { CreateTaskService } from '../../task/services/create-task.service';
import { FindAllTasksService } from '../../task/services/find-all-tasks.service';
import { UserResponseDto } from '../../user/dtos/response/user.response.dto';

type TaskState = {
  id: string;
  status: 'pending' | 'voting' | 'revealed' | 'closed';
  votes: Map<string, number>;
  players: Set<string>;
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
  ) {}

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

  @SubscribeMessage('room:task:join')
  async joinTask(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { taskId: string },
  ) {
    const { taskId } = payload;

    const user: UserResponseDto = client.data.user;

    await client.join(taskId);

    let task = this.taskState.get(taskId);

    if (!task) {
      task = {
        id: taskId,
        votes: new Map(),
        status: 'pending',
        players: new Set<string>(),
      };

      this.taskState.set(taskId, task);
    }

    task.players.add(user.id);

    this.server.to(taskId).emit(`room:task:${taskId}`, this.taskState);
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
      task.players.delete(user.id);

      this.server.to(taskId).emit(`room:task:${taskId}`, this.taskState);
    }
  }
}
