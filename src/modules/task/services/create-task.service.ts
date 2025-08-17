import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../respositories/task.repository';
import { TaskPlanningIaIntegration } from '../integrations/task-planning-ia.integration';
import { plainToInstance } from 'class-transformer';
import { TaskResponseDto } from '../dtos/response/task.response.dto';
import { FindByIdPlanningRoomService } from '../../planning-room/services/find-by-id-planning-room.service';
import { CreateTasksRequestDto } from '../dtos/request/create-tasks-request.dto';

@Injectable()
export class CreateTaskService {
  constructor(
    private readonly repository: TaskRepository,
    private readonly findByIdPlanningRoomService: FindByIdPlanningRoomService,
    private readonly taskPlanningIaIntegration: TaskPlanningIaIntegration,
  ) {}

  public async execute(
    requestBody: CreateTasksRequestDto,
  ): Promise<TaskResponseDto[]> {
    await this.findByIdPlanningRoomService.execute(
      requestBody.tasks[0].planningRoomId,
    );

    const taskCreated = await this.repository.create(requestBody.tasks);
    const taskIaCreate = await this.taskPlanningIaIntegration.createTaskToIa(
      requestBody.tasks,
    );

    return plainToInstance(TaskResponseDto, taskCreated);
  }
}
