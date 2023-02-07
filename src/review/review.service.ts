import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dtos/create-review.dto';
import { Review } from './review.entity';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private repo: Repository<Review>,
    private userService: UsersService,
    private restaurantService: RestaurantService,
  ) {}

  async create(reviewDto: CreateReviewDto, request) {
    const review = this.repo.create(reviewDto);
    review.restaurant = await this.restaurantService.getRestaurantById(
      reviewDto.restaurantId,
    );
    if (!review.restaurant) {
      throw new NotFoundException('restaurant not found');
    }
    review.user = await this.userService.findById(request.user.userId);
    if (!review.user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.save(review);
  }

  async findAllReviews() {
    return await this.repo.find({
      relations: {
        user: true,
      },
    });
  }
}
