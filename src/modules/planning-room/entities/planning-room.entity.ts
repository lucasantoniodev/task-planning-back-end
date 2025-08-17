import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlanningRoomEntity {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  ownerId: string;
}
