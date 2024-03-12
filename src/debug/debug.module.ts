import { Module } from '@nestjs/common';
import { DebugController } from './debug.controller';
import { AdminNotificationsModule } from 'src/admin-notifications/admin-notifications.module';
import { ShdwLeaderboardModule } from 'src/shdw-leaderboard/shdw-leaderboard.module';

@Module({
  imports: [AdminNotificationsModule, ShdwLeaderboardModule],
  controllers: [DebugController],
})
export class DebugModule {}
