import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskService } from '../services/create-task.service';
import { CreateTasksRequestDto } from '../dtos/request/create-tasks-request.dto';
import { TaskResponseDto } from '../dtos/response/task.response.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly service: CreateTaskService) {}

  @Post()
  public async execute(
    @Body() requestBody: CreateTasksRequestDto,
  ): Promise<TaskResponseDto[]> {
    return this.service.execute(requestBody);
  }
}
