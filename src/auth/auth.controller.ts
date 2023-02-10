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
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { AuthService } from './auth.service';
import { CreateAdminOrOwner } from './dtos/create-admin-or-owner.dto';
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

  @Post('/createAdminOrOwner')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async signupAdminOrOwner(@Body() body: CreateAdminOrOwner) {
    return this.authService.signup(
      body.email,
      body.password,
      body.name,
      body.surname,
      body.telephone_number,
      body.role,
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
