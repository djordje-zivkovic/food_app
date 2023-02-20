import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { UsersModule } from '../users/users.module';
import { MealController } from './meal.controller';
import { Meal } from './meal.entity';
import { MealService } from './meal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal]), RestaurantModule, UsersModule],
  exports: [MealService],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
