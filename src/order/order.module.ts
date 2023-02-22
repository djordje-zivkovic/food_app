import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyMenuModule } from '../daily-menu/daily-menu.module';
import { MealModule } from '../meal/meal.module';
import { UsersModule } from '../users/users.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    MealModule,
    DailyMenuModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
