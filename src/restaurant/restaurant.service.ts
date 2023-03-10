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
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private repo: Repository<Restaurant>,
    private usersService: UsersService,
  ) {}

  async create(reportDto: CreateRestaurantDto) {
    const restaurant = this.repo.create(reportDto);
    restaurant.user = await this.usersService.findById(reportDto.userId);
    if (!restaurant.user) {
      throw new NotFoundException('user not found');
    }
    if (restaurant.user.role !== Role.OWNER) {
      throw new BadRequestException('Only owners can have restaurant');
    }
    return this.repo.save(restaurant);
  }

  async deleteRestaurant(id: number) {
    const restaurant = await this.repo.findOneBy({ id });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    return await this.repo
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

  async updateRestaurant(
    restaurantId: number,
    body: UpdateRestaurantDto,
    userId: number,
  ) {
    await this.validateRestaurantOwnership(userId, restaurantId);

    return await this.repo
      .createQueryBuilder()
      .update(Restaurant)
      .set(body)
      .where('id = :id', { id: restaurantId })
      .execute();
  }

  async validateRestaurantOwnership(userId, restaurantId) {
    const loggedUser = await this.usersService.findById(userId);
    const restaurant = await this.getRestaurantById(restaurantId);
    if (!restaurant) {
      throw new BadRequestException('The specified restaurant does not exist');
    }
    if (!loggedUser.restaurants.some((r) => r.id === restaurant.id)) {
      throw new UnauthorizedException('You do not own this restaurant');
    }
  }
}
