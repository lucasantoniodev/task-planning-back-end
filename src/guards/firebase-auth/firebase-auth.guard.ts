// src/auth/firebase-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { admin } from '../../firebase/firebase-admin.config';
import { plainToInstance } from 'class-transformer';
import { UpsertUserRequestDto } from '../../modules/user/dtos/resquest/upsert-user.request.dto';
import { UpsertUserService } from '../../modules/user/services/upsert-user.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private upsertUserService: UpsertUserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const requestToken: string =
      client.handshake.auth?.token ??
      client.handshake.headers?.authorization ??
      '';
    const token: string = requestToken.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      client.data.user = await this.upsertUserService.execute(
        plainToInstance(UpsertUserRequestDto, {
          uid: decodedToken.uid,
          name: decodedToken.name,
          email: decodedToken.email,
        } satisfies UpsertUserRequestDto),
      );

      return true;
    } catch (err) {
      throw new WsException(err as string);
    }
  }
}
