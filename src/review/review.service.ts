import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dtos/create-review.dto';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private repo: Repository<Review>,
    private userService: UsersService,
  ) {}

  async create(reviewDto: CreateReviewDto, request) {
    const review = this.repo.create(reviewDto);
    review.user = await this.userService.FindById(request.user.userId);
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
