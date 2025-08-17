import { Injectable } from '@nestjs/common';
import { PlanningRoomRepository } from '../repositories/planning-room.repository';
import { CreatePlanningRoomRequestDto } from '../dtos/request/create-planning-room.request.dto';
import { PlanningRoomResponseDto } from '../dtos/response/planning-room.response.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../../user/dtos/response/user.response.dto';

@Injectable()
export class CreatePlanningRoomService {
  constructor(private readonly repository: PlanningRoomRepository) {}

  public async execute(
    requestBody: CreatePlanningRoomRequestDto,
    user: UserResponseDto,
  ): Promise<PlanningRoomResponseDto> {
    const planningRoom = await this.repository.create(requestBody, user.id);

    return plainToInstance(PlanningRoomResponseDto, planningRoom);
  }
}
