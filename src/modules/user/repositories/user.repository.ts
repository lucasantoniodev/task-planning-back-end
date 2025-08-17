import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpsertUserRequestDto } from '../dtos/resquest/upsert-user.request.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async upsert(user: UpsertUserRequestDto): Promise<UserEntity> {
    const userCreated = await this.prismaService.user.upsert({
      where: { uid: user.uid },
      update: { name: user.name, email: user.email },
      create: {
        uid: user.uid,
        name: user.name,
        email: user.email,
        coins: 0,
      },
    });

    return plainToInstance(UserEntity, userCreated);
  }
}
