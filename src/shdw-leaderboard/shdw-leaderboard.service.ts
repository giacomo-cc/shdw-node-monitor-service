import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import { AdminNotificationsService } from 'src/admin-notifications/admin-notifications.service';

const LEADERBOARD_URL =
  'https://shdw-rewards-oracle.shdwdrive.com/node-leaderboard';

@Injectable()
export class ShdwLeaderboardService {
  private _lastStatus: string | undefined = undefined;

  constructor(
    private readonly adminNotifications: AdminNotificationsService,
    private readonly httpService: HttpService,
  ) {}
  private readonly logger = new Logger(ShdwLeaderboardService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.log('cron fired, get not info');
    const nodeStatus = await this.retrieveNodeInformations();

    if (
      this._lastStatus == undefined ||
      this._lastStatus !== nodeStatus.status
    ) {
      // status changed
      let message = 'node changed status\n';
      message += `up: ${nodeStatus.is_up ? 'yes' : 'no'}\n`;
      message += `status: ${nodeStatus.status}\n`;

      this.adminNotifications.sendMessage(message);

      this._lastStatus = nodeStatus.status;
    }
  }

  async retrieveNodeInformations(): Promise<NodeStatus | undefined> {
    try {
      this.logger.log('retrieve node informations');

      const obs = this.httpService.get<LeaderboardReponse>(LEADERBOARD_URL);
      const res = await lastValueFrom(obs);
      if (res.status == 200) {
        return res.data.nodes.find(
          (c) => c.node_id === process.env.SHDW_NODE_ID,
        );
      }
    } catch (error) {
      this.logger.fatal(JSON.stringify(error));
    }

    return undefined;
  }
}

type NodeStatus = {
  node_id: string;
  is_discord_verified: boolean;
  is_up: boolean;
  status: string;
  uptime: number;
  total_rewards: number;
};

export type LeaderboardReponse = {
  nodes: NodeStatus[];
};
