import { Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantPlanningRoomRepository } from '../repositories/participant-planning-room.repository';
import { ParticipantPlanningRoomEntity } from '../entities/participant-planning-room.entity';
import { PlanningRoomRepository } from '../repositories/planning-room.repository';

@Injectable()
export class JoinToPlanningRoomService {
  constructor(
    private readonly participantPlanningRoomRepository: ParticipantPlanningRoomRepository,
    private readonly planningRoomRepository: PlanningRoomRepository,
  ) {}

  async execute(
    userId: string,
    planningRoomId: string,
  ): Promise<ParticipantPlanningRoomEntity> {
    await this.validateExistingRoom(planningRoomId);

    return this.participantPlanningRoomRepository.create({
      userId,
      planningRoomId,
    });
  }

  private async validateExistingRoom(planningRoomId: string): Promise<void> {
    const room = await this.planningRoomRepository.findById(planningRoomId);

    if (!room) {
      throw new NotFoundException(
        `Could not find planning room with id ${planningRoomId}`,
      );
    }
  }
}
