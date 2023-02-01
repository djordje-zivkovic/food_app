import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
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
    return this.authService.signup(body.email, body.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Body() body: CreateUserDto) {
    return body;
  }
}
