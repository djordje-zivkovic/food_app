import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../enums/role.enum';
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
    restaurant.user = await this.usersService.findById(reportDto.userId);
    if (!restaurant.user) {
      throw new NotFoundException('user not found');
    }
    if (restaurant.user.role !== Role.Owner) {
      throw new BadRequestException('Only owners can have restaurant');
    }
    return this.repo.save(restaurant);
  }

  async deleteRestaurant(id: number) {
    const restaurant = await this.repo.findOneBy({ id });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    return this.repo
      .createQueryBuilder('restaurant')
      .delete()
      .from(Restaurant)
      .where({ id })
      .execute();
  }

  async getRestaurants() {
    return this.repo.find({
      relations: {
        user: true,
      },
    });
  }

  async getRestaurantById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async GetRestaurantByIdandUserId(id: number, userId: number) {
    const restaurant = await this.repo.findOne({
      where: [{ id: id, userId: userId }],
    });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    return restaurant;
  }

  async validateRestaurantOwnership(userId, restaurantId) {
    const loggedUser = await this.usersService.findById(userId);
    const restaurant = await this.getRestaurantById(restaurantId);
    if (!restaurant) {
      throw new BadRequestException('The specified restaurant does not exist');
    }
    if (!loggedUser.restaurants.some((r) => r.id === restaurant.id)) {
      throw new UnauthorizedException(
        "You can't create meals in restaurants which you do not own",
      );
    }
  }
}
