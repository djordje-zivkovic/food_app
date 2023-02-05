import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './review.entity';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UsersModule],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
