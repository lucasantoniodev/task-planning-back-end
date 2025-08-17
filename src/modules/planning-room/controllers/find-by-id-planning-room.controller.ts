import { Controller, Get, Param } from '@nestjs/common';
import { FindByIdPlanningRoomService } from '../services/find-by-id-planning-room.service';

@Controller('planning-room')
export class FindByIdPlanningRoomController {
  constructor(private readonly service: FindByIdPlanningRoomService) {}

  @Get('/:id')
  public async execute(@Param('id') id: string) {
    return this.service.execute(id);
  }
}
