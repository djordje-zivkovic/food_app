import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      host: this.configService.get('TRAPMAIL_HOST'),
      port: this.configService.get('TRAPMAIL_PORT'),
      auth: {
        user: this.configService.get('TRAPMAIL_AUTH_USER'),
        pass: this.configService.get('TRAPMAIL_AUTH_PASS'),
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
