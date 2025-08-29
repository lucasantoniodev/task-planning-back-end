// src/common/filters/ws-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export class PlanningRoomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();

    let message = 'Erro interno no servidor';

    if (exception instanceof WsException) {
      message = exception.getError() as string;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    client.emit('room:errors', {
      status: 'error',
      message,
    });
  }
}
