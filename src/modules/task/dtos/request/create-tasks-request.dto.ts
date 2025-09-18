import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

@Exclude()
export class CreateTasksRequestDto {
  @Expose()
  @IsNotEmpty()
  description: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  points: number;

  @Expose()
  @IsNotEmpty()
  @IsUUID(4)
  planningRoomId: string;
}
