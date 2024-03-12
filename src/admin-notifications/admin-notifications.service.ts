import { Injectable, Logger } from '@nestjs/common';
import { TelegramService } from 'nestjs-telegram';

@Injectable()
export class AdminNotificationsService {
  constructor(private readonly telegram: TelegramService) {}
  private readonly logger = new Logger(AdminNotificationsService.name);

  sendMessage(message: string) {
    try {
      this.logger.log('send message: ' + message);
      this.telegram
        .sendMessage({
          chat_id: process.env.TELEGRAM_BOT_ADMIN_CHAT,
          text: message,
        })
        .toPromise();
    } catch (error) {
      this.logger.fatal(JSON.stringify(error));
    }
  }
}
