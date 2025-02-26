import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { BackblazeService } from 'src/services/backblaze.service';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('upload')
export class CampainhaController {
    constructor(
        private readonly backblazeService: BackblazeService,
        private readonly telegramService: TelegramService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        // Envia o buffer do arquivo para o Backblaze
        const uploadResponse = await this.backblazeService.uploadFile(
            file.buffer,        // Buffer do arquivo
            file.originalname,  // Nome do arquivo
            file.mimetype       // Tipo de conteúdo (ex: image/jpeg)
        );
        console.log(uploadResponse)
        // Envia a URL para o Telegram
        await this.telegramService.sendTelegramMessage(uploadResponse.url);

        return { message: 'Arquivo enviado com sucesso!', url: uploadResponse.url };
    }
}
