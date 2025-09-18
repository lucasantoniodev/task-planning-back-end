import { Injectable } from '@nestjs/common';
import { FindAllTasksQueryDto } from '../dtos/request/find-all-tasks.query.dto';
import { TaskEntity } from '../entities/task.entity';
import { TaskRepository } from '../respositories/task.repository';

@Injectable()
export class FindAllTasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(filters: FindAllTasksQueryDto): Promise<TaskEntity[]> {
    return this.taskRepository.findAll(filters);
  }
}
