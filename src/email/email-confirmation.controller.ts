import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Get,
} from '@nestjs/common';
import { EmailConfirmationService } from './emailConfirmation.service';
import ConfirmEmailDto from './dtos/confirmEmail.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get('confirm/:token')
  async confirm(@Param('token') token) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }

  @Post('resend-confirmation-link')
  @UseGuards(JwtAuthGuard)
  async resendConfirmationLink(@Req() request) {
    await this.emailConfirmationService.resendConfirmationLink(
      request.user.userId,
    );
  }
}
