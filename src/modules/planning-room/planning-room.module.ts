import { Module } from '@nestjs/common';
import { CreatePlanningRoomService } from './services/create-planning-room.service';
import { CreatePlanningRoomController } from './controllers/create-planning-room.controller';
import { PlanningRoomRepository } from './repositories/planning-room.repository';
import { ParticipantPlanningRoomRepository } from './repositories/participant-planning-room.repository';
import { FindByIdPlanningRoomController } from './controllers/find-by-id-planning-room.controller';
import { FindByIdPlanningRoomService } from './services/find-by-id-planning-room.service';

@Module({
  providers: [
    CreatePlanningRoomService,
    PlanningRoomRepository,
    ParticipantPlanningRoomRepository,
    FindByIdPlanningRoomService,
  ],
  controllers: [CreatePlanningRoomController, FindByIdPlanningRoomController],
})
export class PlanningRoomModule {}
