import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PlanningRoomEntity } from '../entities/planning-room.entity';
import { plainToInstance } from 'class-transformer';
import { CreatePlanningRoomRequestDto } from '../dtos/request/create-planning-room.request.dto';

@Injectable()
export class PlanningRoomRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(planningRoom: CreatePlanningRoomRequestDto, ownerId: string) {
    const planningRoomCreated = await this.prismaService.planningRoom.create({
      data: { ...planningRoom, ownerId },
    });

    return plainToInstance(PlanningRoomEntity, planningRoomCreated);
  }

  async findById(id: string): Promise<PlanningRoomEntity> {
    const planningRoomCreated =
      await this.prismaService.planningRoom.findUnique({
        where: { id },
      });

    return plainToInstance(PlanningRoomEntity, planningRoomCreated);
  }
}
