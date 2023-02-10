import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { CreateMealDto } from './dtos/create-meal.dto';
import { UpdateMealDto } from './dtos/update-meal.dto';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}

  //   @Post()
  //   @Roles(Role.Owner)
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   createDailyMenu(@Body() body: CreateDailyMenuDto) {
  //     return this.dailyMenuService.create(body);
  //   }

  @Post()
  @Roles(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createMeal(@Body() body: CreateMealDto, @Req() request) {
    return this.mealService.create(body, request);
  }

  @Put(':id')
  @Roles(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateMeal(@Param('id') id, @Body() body: UpdateMealDto, @Req() request) {
    return this.mealService.updateMeal(id, body, request);
  }

  @Get()
  getAllMeal() {
    return this.mealService.getAllMeal();
  }
}
