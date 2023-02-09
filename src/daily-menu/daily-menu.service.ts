import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Meal } from '../meal/meal.entity';
import { MealService } from '../meal/meal.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UsersService } from '../users/users.service';
import { DailyMenu } from './daily-menu.entity';
import { CreateDailyMenuDto } from './dtos/create-dailymenu.dto';

@Injectable()
export class DailyMenuService {
  constructor(
    @InjectRepository(DailyMenu) private repo: Repository<DailyMenu>,

    private usersService: UsersService,
    private restaurantService: RestaurantService,
    private mealService: MealService,
  ) {}

  async create(dailyMenuDto: CreateDailyMenuDto, request) {
    await this.restaurantService.validateRestaurantOwnership(
      request.user.userId,
      dailyMenuDto.restaurantId,
    );
    const dailyMenu = this.repo.create(dailyMenuDto);
    dailyMenu.meals = await this.mealService.getMealsbyId(dailyMenuDto.mealId);
    if (!dailyMenu.meals) {
      throw new NotFoundException('No meals found with the given id');
    }
    dailyMenu.restaurant = await this.restaurantService.getRestaurantById(
      dailyMenuDto.restaurantId,
    );
    return await this.repo.save(dailyMenu);
  }

  async getMenusById(id: number[]) {
    const menus = await this.repo.find({ where: { id: In(id) } });
    if (!menus) {
      throw new NotFoundException('menu by that id not found');
    }
    return menus;
  }

  async getAllMenus() {
    const allMenus = await this.repo.find({
      relations: {
        meals: true,
      },
    });
    return allMenus;
  }
}
