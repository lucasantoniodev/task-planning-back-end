import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TaskEntity {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  points: number;

  @Expose()
  planningRoomId: string;
}
