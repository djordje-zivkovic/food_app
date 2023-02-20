import { Module } from '@nestjs/common';
import EmailService from './email.service';
import { ConfigModule } from '@nestjs/config';
import { EmailConfirmationService } from './emailConfirmation.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [EmailService, EmailConfirmationService],
  exports: [EmailService, EmailConfirmationService],
})
export class EmailModule {}
