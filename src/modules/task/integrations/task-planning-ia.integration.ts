import { Injectable } from '@nestjs/common';
import { IntegrationService } from '../../integration/integration.service';
import { TaskRequestDto } from '../dtos/request/create-tasks-request.dto';

@Injectable()
export class TaskPlanningIaIntegration {
  public static BASE_URL: string = process.env.IA_INTEGRATION_URL ?? '';

  constructor(private readonly integrationService: IntegrationService) {}

  async createTaskToIa(requestBody: TaskRequestDto[]) {
    const { data } = await this.integrationService.post(
      `${TaskPlanningIaIntegration.BASE_URL}/ai/tasks`,

      requestBody,
    );
    return data;
  }
}
