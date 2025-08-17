import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlanningRoomController } from './create-planning-room.controller';

describe('PlanningRoomController', () => {
  let controller: CreatePlanningRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatePlanningRoomController],
    }).compile();

    controller = module.get<CreatePlanningRoomController>(
      CreatePlanningRoomController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
