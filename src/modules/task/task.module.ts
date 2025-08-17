import { Module } from '@nestjs/common';
import { TaskController } from './controllers/create-task.controller';
import { CreateTaskService } from './services/create-task.service';
import { TaskPlanningIaIntegration } from './integrations/task-planning-ia.integration';
import { TaskRepository } from './respositories/task.repository';
import { IntegrationModule } from '../integration/integration.module';
import { FindByIdPlanningRoomService } from '../planning-room/services/find-by-id-planning-room.service';
import { PlanningRoomRepository } from '../planning-room/repositories/planning-room.repository';

@Module({
  imports: [IntegrationModule],
  providers: [
    CreateTaskService,
    TaskRepository,
    TaskPlanningIaIntegration,
    FindByIdPlanningRoomService,
    PlanningRoomRepository,
  ],
  controllers: [TaskController],
  exports: [],
})
export class TaskModule {}
