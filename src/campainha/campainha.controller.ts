import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BackblazeService } from 'src/services/backblaze.service';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('upload')
export class CampainhaController {
    private defaultImageUrl = 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg'; // Defina a URL da imagem padrão

    constructor(
        private readonly backblazeService: BackblazeService,
        private readonly telegramService: TelegramService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('name') name: string,// Captura o nome enviado no request
        @Body('latitude') latitude: string,
        @Body('longitude') longitude: string
    ) {
        let fileUrl = this.defaultImageUrl; // Definição da URL padrão

        if (file) {
            // Se houver um arquivo, faz o upload normalmente
            const uploadResponse = await this.backblazeService.uploadFile(
                file.buffer,
                this.sanitizeString(file.originalname), // Aplica a limpeza no nome do arquivo
                file.mimetype
            );
            fileUrl = this.sanitizeString(uploadResponse.url); // Remove acentos e espaços da URL
        }

        const userName = name?.trim() || 'Visitante'; // Se não enviar nome, usa "Visitante"

        // Envia a mensagem para o Telegram com o nome e a imagem/vídeo
        await this.telegramService.sendTelegramMessage(userName, fileUrl, latitude, longitude);

        return { message: 'Arquivo enviado com sucesso!', url: fileUrl, name: userName };
    }

    // ✅ Função para remover acentos e espaços
    private sanitizeString(text: string): string {
        return text
            .normalize("NFD").replace(/\p{Diacritic}/gu, "") // Remove acentos
            .replace(/\s+/g, "") // Remove todos os espaços
            .toLowerCase(); // Converte para minúsculas
    }
}
