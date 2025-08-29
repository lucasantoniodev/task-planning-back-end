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
import { JoinToPlanningRoomService } from '../services/join-to-planning-room.service';
import { PlanningRoomExceptionFilter } from './planning-room-exception.filter';
import { UserResponseDto } from '../../user/dtos/response/user.response.dto';

type JoinPayload = { roomId: string };
type VotePayload = { roomId: string; value: string | number | null };
type StoryPayload = { roomId: string; story?: string };
type RoomOnly = { roomId: string };

@UseGuards(FirebaseAuthGuard)
@UseFilters(PlanningRoomExceptionFilter)
@WebSocketGateway()
export class PlanningRoomGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private rooms = new Map<string, RoomState>();

  constructor(
    private readonly joinToPlanningRoomService: JoinToPlanningRoomService,
  ) {}

  handleConnection() {}

  handleDisconnect() {}

  @SubscribeMessage('room:join')
  async onJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinPayload,
  ) {
    const { roomId } = payload;
    const user: UserResponseDto = client.data.user;

    await client.join(roomId);

    const response = await this.joinToPlanningRoomService.execute(
      user.id,
      roomId,
    );

    if (!response) {
      await client.leave(roomId);
      return client.emit('room:info:user', {
        message: `Não foi possível acessar a sala com ID ${roomId}`,
      });
    }

    client.emit('room:info:user', {
      message: `Você entrou na sala com ID: ${roomId} com sucesso!`,
    });

    this.server.to(roomId).emit('room:info', {
      message: `${user.name} entrou na sala!`,
    });
  }

  private serialize(room: RoomState, currentPlayerId?: string) {
    return {
      id: room.id,
      revealed: room.revealed,
      story: room.story ?? null,
      players: Array.from(room.players.values()).map((p) => ({
        id: p.id,
        name: p.name,
        vote: room.revealed ? p.vote : p.id === currentPlayerId ? p.vote : null,
        joinedAt: p.joinedAt,
      })),
    };
  }
}
