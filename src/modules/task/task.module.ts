import { Module } from '@nestjs/common';
import { TaskController } from './controllers/create-task.controller';
import { CreateTaskService } from './services/create-task.service';
import { TaskPlanningIaIntegration } from './integrations/task-planning-ia.integration';
import { TaskRepository } from './respositories/task.repository';
import { IntegrationModule } from '../integration/integration.module';
import { FindByIdPlanningRoomService } from '../planning-room/services/find-by-id-planning-room.service';
import { PlanningRoomRepository } from '../planning-room/repositories/planning-room.repository';
import { FindAllTasksService } from './services/find-all-tasks.service';

@Module({
  imports: [IntegrationModule],
  providers: [
    TaskRepository,
    TaskPlanningIaIntegration,
    FindByIdPlanningRoomService,
    PlanningRoomRepository,
    FindAllTasksService,
    CreateTaskService,
  ],
  controllers: [TaskController],
  exports: [
    CreateTaskService,
    FindAllTasksService,
    TaskPlanningIaIntegration,
    TaskRepository,
  ],
})
export class TaskModule {}
