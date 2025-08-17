import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';

@Exclude()
export class CreateTasksRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskRequestDto)
  tasks: TaskRequestDto[];
}

@Exclude()
export class TaskRequestDto {
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
