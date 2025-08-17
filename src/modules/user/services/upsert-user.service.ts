import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UpsertUserRequestDto } from '../dtos/resquest/upsert-user.request.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dtos/response/user.response.dto';

@Injectable()
export class UpsertUserService {
  constructor(private readonly repository: UserRepository) {}

  public async execute(requestBody: UpsertUserRequestDto) {
    const user = await this.repository.upsert(requestBody);

    return plainToInstance(UserResponseDto, user);
  }
}
