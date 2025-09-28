import { Controller, Get, Param } from '@nestjs/common';
import { FindByIdPlanningRoomService } from '../services/find-by-id-planning-room.service';
import { PlanningRoomResponseDto } from '../dtos/response/planning-room.response.dto';

@Controller('planning-rooms')
export class FindByIdPlanningRoomController {
  constructor(private readonly service: FindByIdPlanningRoomService) {}

  @Get('/:id')
  public async execute(
    @Param('id') id: string,
  ): Promise<PlanningRoomResponseDto> {
    return this.service.execute(id);
  }
}
