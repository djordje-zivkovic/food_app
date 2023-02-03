import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  // only admin can create restaurant for different owner. Need to refactor this.
  createRestaurant(@Body() body: createRestaurantDto) {
    return this.restaurantService.create(body);
  }

  @Get()
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }
}
