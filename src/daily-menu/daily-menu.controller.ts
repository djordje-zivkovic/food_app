import { Body, Controller, Post } from '@nestjs/common';
import { DailyMenuService } from './daily-menu.service';
import { CreateDailyMenuDto } from './dtos/create-dailymenu.dto';

@Controller('daily-menu')
export class DailyMenuController {
  constructor(private dailyMenuService: DailyMenuService) {}

  @Post()
  createDailyMenu(@Body() body: CreateDailyMenuDto) {
    return this.dailyMenuService.create(body);
  }
}
