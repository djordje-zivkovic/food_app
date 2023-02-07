import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UsersService } from '../users/users.service';
import { CreateMealDto } from './dtos/create-meal.dto';
import { Meal } from './meal.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal) private repo: Repository<Meal>,
    private restaurantService: RestaurantService,
  ) {}

  async create(mealDto: CreateMealDto, userId) {
    const meal = await this.repo.create(mealDto);
    console.log('mealDto : ', mealDto.restaurantId, 'userId :', userId);
    meal.restaurant = await this.restaurantService.GetRestaurantById(
      mealDto.restaurantId,
      userId,
    );
    if (!meal.restaurant) {
      throw new NotFoundException(
        'restaurant not found, or youre not the owner of it',
      );
    }
    return await this.repo.save(meal);
  }
}
