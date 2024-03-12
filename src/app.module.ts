import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { DebugModule } from './debug/debug.module';
import { ShdwLeaderboardModule } from './shdw-leaderboard/shdw-leaderboard.module';
import { AdminNotificationsModule } from './admin-notifications/admin-notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    DebugModule,
    ShdwLeaderboardModule,
    AdminNotificationsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
