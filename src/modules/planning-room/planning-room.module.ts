import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CreatePlanningRoomService } from './services/create-planning-room.service';
import { CreatePlanningRoomController } from './controllers/create-planning-room.controller';
import { PlanningRoomRepository } from './repositories/planning-room.repository';
import { FindByIdPlanningRoomController } from './controllers/find-by-id-planning-room.controller';
import { FindByIdPlanningRoomService } from './services/find-by-id-planning-room.service';
import { PlanningRoomGateway } from './gateways/planning-room.gateway';
import { TaskGateway } from './gateways/task.gateway';
import { TaskModule } from '../task/task.module';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { FindTaskByIdService } from '../task/services/find-task-by-id.service';

@Module({
  imports: [TaskModule],
  providers: [
    CreatePlanningRoomService,
    PlanningRoomRepository,
    FindByIdPlanningRoomService,
    PlanningRoomGateway,
    TaskGateway,
    FindTaskByIdService,
  ],
  controllers: [CreatePlanningRoomController, FindByIdPlanningRoomController],
})
export class PlanningRoomModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(CreatePlanningRoomController, FindByIdPlanningRoomController);
  }
}
