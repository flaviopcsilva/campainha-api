import { Module } from '@nestjs/common';
import { CampainhaService } from './campainha.service';
import { CampainhaController } from './campainha.controller';
import { TelegramService } from 'src/telegram/telegram.service';
import { BackblazeService } from 'src/services/backblaze.service';

@Module({
  providers: [CampainhaService, TelegramService, BackblazeService],
  controllers: [CampainhaController]
})
export class CampainhaModule { }
