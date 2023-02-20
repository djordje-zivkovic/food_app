import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/role.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CreateReviewDto } from './dtos/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createReview(@Body() body: CreateReviewDto, @Req() request) {
    return this.reviewService.create(body, request);
  }

  @Get()
  listAllReviews() {
    return this.reviewService.findAllReviews();
  }
}
