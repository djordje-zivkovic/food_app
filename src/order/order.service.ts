import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyMenuService } from '../daily-menu/daily-menu.service';
import { MealService } from '../meal/meal.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private userService: UsersService,
    private mealService: MealService,
    private dailyMenuService: DailyMenuService,
  ) {}

  async createOrder(orderDto: CreateOrderDto, request) {
    const order = this.repo.create(orderDto);
    order.user = await this.userService.findById(request.user.userId);
    order.dailyMenus = await this.dailyMenuService.getMenusById(
      orderDto.dailyMenuId,
    );
    if (!order.dailyMenus) {
      throw new NotFoundException('No meals found with the given id');
    }

    return this.repo.save(order);
  }

  async getAllOrders() {
    return this.repo.find();
  }
}
