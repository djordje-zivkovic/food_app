import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() { user }): User {
    return user;
  }
}
