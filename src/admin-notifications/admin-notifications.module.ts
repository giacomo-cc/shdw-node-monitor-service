import { Module } from '@nestjs/common';
import { TelegramModule } from 'nestjs-telegram';
import { AdminNotificationsService } from './admin-notifications.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        botKey: configService.getOrThrow('TELEGRAM_BOT_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AdminNotificationsService],
  exports: [AdminNotificationsService],
})
export class AdminNotificationsModule {}
