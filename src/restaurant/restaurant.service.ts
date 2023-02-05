import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { createRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private repo: Repository<Restaurant>,
    private usersService: UsersService,
  ) {}

  async create(reportDto: createRestaurantDto) {
    const restaurant = this.repo.create(reportDto);
    restaurant.user = await this.usersService.FindById(reportDto.userId);
    if (!restaurant.user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.save(restaurant);
  }

  async getRestaurants() {
    return this.repo.find({
      relations: {
        user: true,
      },
    });
  }
}
