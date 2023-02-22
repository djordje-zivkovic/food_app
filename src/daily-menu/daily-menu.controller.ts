import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { DailyMenuService } from './daily-menu.service';
import { CreateDailyMenuDto } from './dtos/create-dailymenu.dto';

@Controller('daily-menu')
export class DailyMenuController {
  constructor(private dailyMenuService: DailyMenuService) {}

  @Post()
  @Roles(Role.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createDailyMenu(@Body() body: CreateDailyMenuDto, @Req() request) {
    return this.dailyMenuService.create(body, request);
  }

  @Get()
  getAllMenus() {
    return this.dailyMenuService.getAllMenus();
  }
}
