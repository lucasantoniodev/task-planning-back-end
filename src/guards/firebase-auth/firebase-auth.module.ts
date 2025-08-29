import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { UpsertUserService } from '../../modules/user/services/upsert-user.service';

@Module({
  imports: [UserModule],
  providers: [FirebaseAuthGuard, UpsertUserService],
  exports: [FirebaseAuthGuard],
})
export class FirebaseAuthModule {}
