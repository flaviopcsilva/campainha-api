import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';




@Injectable()
export class BackblazeService {
    private s3: AWS.S3;
    private bucketName: string;

    constructor() {
        this.s3 = new AWS.S3({
            endpoint: 's3.us-east-005.backblazeb2.com', // Exemplo: "https://s3.us-west-001.backblazeb2.com"
            accessKeyId: '005f5bd265ba3de0000000007',
            secretAccessKey: 'K005UZn15t6P5NZKjJdTb+Jq1oAJOvY',
            s3ForcePathStyle: true, // Necessário para compatibilidade com B2
            signatureVersion: 'v4',
        });

        this.bucketName = 'campainha-online';
    }

    async uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string) {
        const params = {
            Bucket: this.bucketName,
            Key: fileName,
            Body: fileBuffer,
            ContentType: mimeType,
        };

        try {
            const data = await this.s3.upload(params).promise();
            const fileUrl = `https://s3.us-east-005.backblazeb2.com/${this.bucketName}/${fileName}`;
            return { url: fileUrl, key: data.Key };

        } catch (error) {
            throw new Error(`Erro ao fazer upload para o B2: ${error.message}`);
        }
    }
}
