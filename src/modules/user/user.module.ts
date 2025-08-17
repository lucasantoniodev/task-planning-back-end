import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UpsertUserService } from './services/upsert-user.service';

@Module({
  imports: [],
  providers: [UpsertUserService, UserRepository],
  exports: [UpsertUserService, UserRepository],
})
export class UserModule {}
