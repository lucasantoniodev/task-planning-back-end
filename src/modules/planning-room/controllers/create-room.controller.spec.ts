import { Test, TestingModule } from '@nestjs/testing';
import { CreateRoomController } from './create-room.controller';

describe('PlanningRoomController', () => {
  let controller: CreateRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateRoomController],
    }).compile();

    controller = module.get<CreateRoomController>(CreateRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
