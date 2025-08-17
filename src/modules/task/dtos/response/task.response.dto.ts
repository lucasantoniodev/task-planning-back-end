import { Exclude } from 'class-transformer';
import { TaskEntity } from '../../entities/task.entity';

@Exclude()
export class TaskResponseDto extends TaskEntity {}
