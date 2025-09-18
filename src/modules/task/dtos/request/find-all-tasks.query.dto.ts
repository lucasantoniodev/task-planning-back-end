import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

@Exclude()
export class FindAllTasksQueryDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID(4)
  planningRoomId: string;
}
