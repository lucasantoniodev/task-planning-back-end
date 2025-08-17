import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreatePlanningRoomRequestDto } from '../dtos/request/create-planning-room.request.dto';
import { CreateRoomService } from '../services/create-room.service';
import { UserResponseDto } from '../../user/dtos/response/user.response.dto';

@Controller('planning-room')
export class CreateRoomController {
  constructor(private readonly service: CreateRoomService) {}

  @Post()
  public async execute(
    @Body() requestBody: CreatePlanningRoomRequestDto,
    @Req() { user }: { user: UserResponseDto },
  ) {
    return this.service.execute(requestBody, user);
  }
}
