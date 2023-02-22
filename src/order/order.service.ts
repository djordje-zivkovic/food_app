import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyMenuService } from '../daily-menu/daily-menu.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private userService: UsersService,
    private dailyMenuService: DailyMenuService,
  ) {}

  async createOrder(orderDto: CreateOrderDto, request) {
    const order = this.repo.create(orderDto);
    order.user = await this.userService.findById(request.user.userId);
    order.dailyMenus = await this.dailyMenuService.getMenusById(
      orderDto.dailyMenuId,
    );
    if (order.dailyMenus.length === 0) {
      throw new NotFoundException('No menus found with the given id');
    }
    console.log(order.dailyMenus);
    return this.repo.save(order);
  }

  async getMyOrders(userId) {
    return this.repo.find({
      where: { user: userId },
    });
  }

  async getAllOrders() {
    return this.repo.find({
      relations: {
        user: true,
        dailyMenus: true,
      },
    });
  }
}
