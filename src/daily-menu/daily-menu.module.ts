import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealModule } from '../meal/meal.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { UsersModule } from '../users/users.module';
import { DailyMenuController } from './daily-menu.controller';
import { DailyMenu } from './daily-menu.entity';
import { DailyMenuService } from './daily-menu.service';

@Module({
  exports: [DailyMenuService],
  imports: [
    TypeOrmModule.forFeature([DailyMenu]),
    RestaurantModule,
    MealModule,
    UsersModule,
  ],
  controllers: [DailyMenuController],
  providers: [DailyMenuService],
})
export class DailyMenuModule {}
