import { Module } from '@nestjs/common';
import { CreatePlanningRoomService } from './services/create-planning-room.service';
import { CreatePlanningRoomController } from './controllers/create-planning-room.controller';
import { PlanningRoomRepository } from './repositories/planning-room.repository';
import { ParticipantPlanningRoomRepository } from './repositories/participant-planning-room.repository';
import { FindByIdPlanningRoomController } from './controllers/find-by-id-planning-room.controller';
import { FindByIdPlanningRoomService } from './services/find-by-id-planning-room.service';
import { PlanningRoomGateway } from './gateways/planning-room.gateway';
import { JoinToPlanningRoomService } from './services/join-to-planning-room.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    CreatePlanningRoomService,
    PlanningRoomRepository,
    ParticipantPlanningRoomRepository,
    FindByIdPlanningRoomService,
    JoinToPlanningRoomService,
    PlanningRoomGateway,
  ],
  controllers: [CreatePlanningRoomController, FindByIdPlanningRoomController],
})
export class PlanningRoomModule {}
