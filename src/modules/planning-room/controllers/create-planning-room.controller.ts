import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreatePlanningRoomRequestDto } from '../dtos/request/create-planning-room.request.dto';
import { CreatePlanningRoomService } from '../services/create-planning-room.service';
import { UserResponseDto } from '../../user/dtos/response/user.response.dto';

@Controller('planning-rooms')
export class CreatePlanningRoomController {
  constructor(private readonly service: CreatePlanningRoomService) {}

  @Post()
  public async execute(
    @Body() requestBody: CreatePlanningRoomRequestDto,
    @Req() { user }: { user: UserResponseDto },
  ) {
    return this.service.execute(requestBody, user);
  }
}
