import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private repo: Repository<Restaurant>,
  ) {}

  async create(
    address: string,
    workinghours: string,
    category: string,
    photo: string,
  ) {
    const restaurant = this.repo.create({
      address,
      workinghours,
      category,
      photo,
    });
    return this.repo.save(restaurant);
  }
}
