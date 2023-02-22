import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UsersService } from '../users/users.service';
import { CreateMealDto } from './dtos/create-meal.dto';
import { UpdateMealDto } from './dtos/update-meal.dto';
import { Meal } from './meal.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal) private repo: Repository<Meal>,
    private restaurantService: RestaurantService,
    private userService: UsersService,
  ) {}

  async create(mealDto: CreateMealDto, request) {
    await this.restaurantService.validateRestaurantOwnership(
      request.user.userId,
      mealDto.restaurantId,
    );
    const meal = await this.repo.create(mealDto);
    meal.restaurant = await this.restaurantService.GetRestaurantByIdandUserId(
      mealDto.restaurantId,
      request.user.userId,
    );
    if (!meal.restaurant) {
      throw new NotFoundException(
        'restaurant not found, or youre not the owner of it',
      );
    }
    return await this.repo.save(meal);
  }

  async updateMeal(id, mealDto: UpdateMealDto, request) {
    const meal = await this.getMealById(id);
    await this.restaurantService.validateRestaurantOwnership(
      request.user.userId,
      meal.restaurant.id,
    );
    return await this.repo
      .createQueryBuilder()
      .update(Meal)
      .set(mealDto)
      .where('id = :id', { id: meal.id })
      .execute();
  }

  async getMealById(id: number) {
    const meal = await this.repo.findOne({
      where: [{ id }],
      relations: {
        restaurant: true,
      },
    });
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    return meal;
  }

  async getMealsbyId(id: number[]) {
    const meals = await this.repo.find({
      where: { id: In(id) },
      relations: {
        restaurant: true,
      },
    });
    return meals;
  }

  async getAllMeal() {
    return this.repo.find({
      relations: {
        restaurant: true,
      },
    });
  }
}
