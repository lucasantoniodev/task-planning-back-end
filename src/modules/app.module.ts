import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlanningRoomModule } from './planning-room/planning-room.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PlanningRoomModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
