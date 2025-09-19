import { Module } from '@nestjs/common';
import { CreatePlanningRoomService } from './services/create-planning-room.service';
import { CreatePlanningRoomController } from './controllers/create-planning-room.controller';
import { PlanningRoomRepository } from './repositories/planning-room.repository';
import { FindByIdPlanningRoomController } from './controllers/find-by-id-planning-room.controller';
import { FindByIdPlanningRoomService } from './services/find-by-id-planning-room.service';
import { PlanningRoomGateway } from './gateways/planning-room.gateway';
import { UserModule } from '../user/user.module';
import { TaskGateway } from './gateways/task.gateway';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [UserModule, TaskModule],
  providers: [
    CreatePlanningRoomService,
    PlanningRoomRepository,
    FindByIdPlanningRoomService,
    PlanningRoomGateway,
    TaskGateway,
  ],
  controllers: [CreatePlanningRoomController, FindByIdPlanningRoomController],
})
export class PlanningRoomModule {}
