import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlanningRoomService } from './create-planning-room.service';

describe('PlanningRoomService', () => {
  let service: CreatePlanningRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePlanningRoomService],
    }).compile();

    service = module.get<CreatePlanningRoomService>(CreatePlanningRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
