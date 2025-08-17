import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ParticipantPlanningRoomEntity {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  planningRoomId: string;
}
