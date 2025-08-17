import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class CreatePlanningRoomRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  title: string;
}
