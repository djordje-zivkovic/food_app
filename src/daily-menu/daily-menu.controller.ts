import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
  @Roles(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createDailyMenu(@Body() body: CreateDailyMenuDto) {
    return this.dailyMenuService.create(body);
  }

  @Get()
  getAllMenus() {
    return this.dailyMenuService.getAllMenus();
  }
}
