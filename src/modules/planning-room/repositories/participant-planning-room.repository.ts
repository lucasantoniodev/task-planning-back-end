import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ParticipantPlanningRoomEntity } from '../entities/participant-planning-room.entity';

@Injectable()
export class ParticipantPlanningRoomRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ userId, planningRoomId }: ParticipantPlanningRoomEntity) {
    const data = await this.prismaService.participantPlanningRoom.upsert({
      where: { userId_planningRoomId: { userId, planningRoomId } },
      update: { updatedAt: new Date() },
      create: { userId, planningRoomId },
    });

    return plainToInstance(ParticipantPlanningRoomEntity, data);
  }
}
