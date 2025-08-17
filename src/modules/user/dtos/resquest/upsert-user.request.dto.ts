import { Exclude } from 'class-transformer';
import { UserEntity } from '../../entities/user.entity';
import { OmitType } from '@nestjs/swagger';

@Exclude()
export class UpsertUserRequestDto extends OmitType(UserEntity, [
  'id',
  'coins',
]) {}
