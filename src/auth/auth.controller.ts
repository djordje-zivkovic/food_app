import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signup(
      body.email,
      body.password,
      body.name,
      body.surname,
      body.telephone_number,
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.signin(req.user);
  }
  @UseGuards(JwtAuthGuard) // Only logged user can access this route
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user.id;
  }
}
