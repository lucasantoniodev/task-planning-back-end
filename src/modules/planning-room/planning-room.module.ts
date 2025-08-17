import { Module } from '@nestjs/common';
import { CreateRoomService } from './services/create-room.service';
import { CreateRoomController } from './controllers/create-room.controller';
import { PlanningRoomRepository } from './repositories/planning-room.repository';
import { ParticipantPlanningRoomRepository } from './repositories/participant-planning-room.repository';

@Module({
  providers: [
    CreateRoomService,
    PlanningRoomRepository,
    ParticipantPlanningRoomRepository,
  ],
  controllers: [CreateRoomController],
})
export class PlanningRoomModule {}
