import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PlanningRoomRepository } from '../repositories/planning-room.repository';
import { PlanningRoomResponseDto } from '../dtos/response/planning-room.response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindByIdPlanningRoomService {
  constructor(private readonly repository: PlanningRoomRepository) {}

  public async execute(id: string): Promise<PlanningRoomResponseDto> {
    const planningRoom = await this.repository.findById(id);

    if (!planningRoom) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Nenhuma sala encontrada com esse UUID',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return plainToInstance(PlanningRoomResponseDto, planningRoom);
  }
}
