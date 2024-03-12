import { Controller, Get, Logger } from '@nestjs/common';
import { AdminNotificationsService } from 'src/admin-notifications/admin-notifications.service';
import { ShdwLeaderboardService } from 'src/shdw-leaderboard/shdw-leaderboard.service';

@Controller('debug')
export class DebugController {
  constructor(
    private readonly adminNotifications: AdminNotificationsService,
    private readonly shdwLeaderboard: ShdwLeaderboardService,
  ) {}
  private readonly logger = new Logger(DebugController.name);

  @Get('node-status')
  async getNodeStatus() {
    this.logger.log('received request');

    const info = await this.shdwLeaderboard.retrieveNodeInformations();
    if (info) {
      let message = '';
      message += `${info.node_id}\n\n`;
      message += `up: ${info.is_up ? 'yes' : 'no'}\n`;
      message += `status: ${info.status}\n`;
      message += `uptime: ${info.uptime}\n`;
      message += `total reward: ${info.total_rewards / 10e8} $SHDW\n`;
      message += `discord verified: ${info.is_discord_verified ? 'yes' : 'no'}\n`;

      this.adminNotifications.sendMessage(message);
    }
    return info;
  }
}
