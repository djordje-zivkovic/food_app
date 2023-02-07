import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealService } from '../meal/meal.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { DailyMenu } from './daily-menu.entity';
import { CreateDailyMenuDto } from './dtos/create-dailymenu.dto';

@Injectable()
export class DailyMenuService {
  constructor(
    @InjectRepository(DailyMenu) private repo: Repository<DailyMenu>,
    private restaurantService: RestaurantService,
    private mealService: MealService,
  ) {}

  async create(dailyMenuDto: CreateDailyMenuDto) {
    const dailyMenu = this.repo.create(dailyMenuDto);
    dailyMenu.meals = await this.mealService.getMealbyId(dailyMenuDto.mealId);
    console.log(dailyMenu.meals);
    if (!dailyMenu.meals) {
      throw new NotFoundException('No meals found with the given id');
    }
    dailyMenu.restaurant = await this.restaurantService.getRestaurantById(
      dailyMenuDto.restaurantId,
    );
    return this.repo.save(dailyMenu);
  }

  async getAllMenus() {
    return this.repo.find({
      relations: {
        restaurant: true,
        meals: true,
      },
    });
  }
}
