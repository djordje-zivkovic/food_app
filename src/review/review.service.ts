import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dtos/create-review.dto';
import { Review } from './review.entity';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Role } from '../enums/role.enum';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private repo: Repository<Review>,
    private userService: UsersService,
    private restaurantService: RestaurantService,
  ) {}

  async create(reviewDto: CreateReviewDto, request) {
    if (request.user.role !== Role.CLIENT) {
      throw new UnauthorizedException('Only client can create a review');
    }
    const review = this.repo.create(reviewDto);
    review.restaurant = await this.restaurantService.getRestaurantById(
      reviewDto.restaurantId,
    );

    const existingReview = await this.repo.findOne({
      where: [
        { user: request.user.userId },
        { restaurantId: reviewDto.restaurantId },
      ],
    });
    if (existingReview) {
      throw new BadRequestException(
        'User has already reviewed this restaurant',
      );
    }

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
        restaurant: true,
      },
    });
  }
}
