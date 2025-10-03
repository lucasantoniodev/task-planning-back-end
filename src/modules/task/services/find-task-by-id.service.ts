import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../respositories/task.repository';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class FindTaskByIdService {
  constructor(private readonly repository: TaskRepository) {}

  async execute(id: string): Promise<TaskEntity | null> {
    return this.repository.findById(id);
  }
}
