import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { TaskEntity } from '../entities/task.entity';
import { TaskRequestDto } from '../dtos/request/create-tasks-request.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(requestBody: TaskRequestDto[]): Promise<TaskEntity[]> {
    const taskCreated = await this.prismaService.task.createManyAndReturn({
      data: requestBody,
    });

    return plainToInstance(TaskEntity, taskCreated);
  }
}
