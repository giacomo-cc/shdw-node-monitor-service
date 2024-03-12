import { Module } from '@nestjs/common';
import { ShdwLeaderboardService } from './shdw-leaderboard.service';
import { HttpModule } from '@nestjs/axios';
import { AdminNotificationsModule } from 'src/admin-notifications/admin-notifications.module';

@Module({
  imports: [HttpModule, AdminNotificationsModule],
  providers: [ShdwLeaderboardService],
  exports: [ShdwLeaderboardService],
})
export class ShdwLeaderboardModule {}
