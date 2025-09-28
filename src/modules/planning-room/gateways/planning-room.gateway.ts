// src/planning-poker/planning-poker.gateway.ts
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FirebaseAuthGuard } from '../../../guards/firebase-auth/firebase-auth.guard';
import { UseFilters, UseGuards } from '@nestjs/common';
import { RoomState } from '../interfaces/room-state.interface';
import { PlanningRoomExceptionFilter } from './planning-room-exception.filter';
import { UserResponseDto } from '../../user/dtos/response/user.response.dto';
import { FindAllTasksService } from '../../task/services/find-all-tasks.service';

type JoinPayload = { roomId: string };

@UseGuards(FirebaseAuthGuard)
@UseFilters(PlanningRoomExceptionFilter)
@WebSocketGateway({ cors: { origin: '*' } })
export class PlanningRoomGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private rooms = new Map<string, RoomState>();

  constructor(private readonly findAllTasksService: FindAllTasksService) {}

  handleConnection() {}

  handleDisconnect() {}

  @SubscribeMessage('room:join')
  async execute(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinPayload,
  ) {
    const { roomId } = payload;

    const user: UserResponseDto = client.data.user;

    await client.join(roomId);

    let room = this.rooms.get(roomId);

    if (!room) {
      room = {
        id: roomId,
        players: new Map(),
      };

      this.rooms.set(roomId, room);
    }

    room.players.set(user.id, {
      id: user.id,
      name: user.name,
      joinedAt: Date.now(),
    });

    const tasks = await this.findAllTasksService.execute({
      planningRoomId: roomId,
    });

    client.emit('room:task:list', tasks);

    this.server.to(roomId).emit('room:alerts', {
      message: `${user.name} entrou na sala!`,
    });

    this.broadcastRoomState(roomId);
  }

  private broadcastRoomState(roomId: string) {
    const room = this.rooms.get(roomId);

    if (!room) return;

    this.server.to(roomId).emit('room:state', this.serialize(room));
  }

  private serialize(room: RoomState) {
    return {
      id: room.id,
      players: Array.from(room.players.values()).map((p) => ({
        id: p.id,
        name: p.name,
        joinedAt: p.joinedAt,
      })),
    };
  }
}
