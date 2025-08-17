import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PlanningRoomEntity } from '../entities/planning-room.entity';
import { plainToInstance } from 'class-transformer';
import { ParticipantPlanningRoomEntity } from '../entities/participant-planning-room.entity';

@Injectable()
export class ParticipantPlanningRoomRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(participantPlanningRoomEntity: ParticipantPlanningRoomEntity) {
    const participantPlanningRoomCreated =
      await this.prismaService.participantPlanningRoom.create({
        data: participantPlanningRoomEntity,
      });

    return plainToInstance(PlanningRoomEntity, participantPlanningRoomCreated);
  }
}
