import { Injectable, NestMiddleware } from '@nestjs/common';
import { admin } from '../firebase/firebase-admin.config';
import { UpsertUserService } from '../modules/user/services/upsert-user.service';
import { plainToInstance } from 'class-transformer';
import { UpsertUserRequestDto } from '../modules/user/dtos/resquest/upsert-user.request.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private upsertUserService: UpsertUserService) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).send('Token não enviado');
    }

    const token: string = authHeader.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      req.user = await this.upsertUserService.execute(
        plainToInstance(UpsertUserRequestDto, {
          uid: decodedToken.uid,
          name: decodedToken.name,
          email: decodedToken.email ?? '',
          photoUrl: decodedToken.picture ?? '',
        } satisfies UpsertUserRequestDto),
      );
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(401).send('Token inválido');
    }
  }
}
