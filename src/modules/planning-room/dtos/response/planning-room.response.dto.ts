import { Exclude } from 'class-transformer';
import { PlanningRoomEntity } from '../../entities/planning-room.entity';

@Exclude()
export class PlanningRoomResponseDto extends PlanningRoomEntity {}
