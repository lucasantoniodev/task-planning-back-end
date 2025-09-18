import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { TaskEntity } from '../entities/task.entity';
import { CreateTasksRequestDto } from '../dtos/request/create-tasks-request.dto';
import { FindAllTasksQueryDto } from '../dtos/request/find-all-tasks.query.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    requestBody: CreateTasksRequestDto[],
  ): Promise<TaskEntity[]> {
    const taskCreated = await this.prismaService.task.createManyAndReturn({
      data: requestBody,
    });

    return plainToInstance(TaskEntity, taskCreated);
  }

  public async findAll(filters: FindAllTasksQueryDto) {
    return this.prismaService.task.findMany({ where: filters });
  }
}
