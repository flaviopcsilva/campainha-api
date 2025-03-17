import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramService {
    private botToken = '7871894609:AAGujnsU0ra8e4sNwXfEZv7beabnaz4GD7g';
    private chatId = '1625345406';

    async sendTelegramMessage(name: string, fileUrl: string) {
        const message = `🚪 Alguém tocou a campainha!\n👤 Nome: *${name}*\n📷 Foto/Vídeo: ${fileUrl}`;
        await axios.post(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
            chat_id: this.chatId,
            text: message,
        });
    }
}
