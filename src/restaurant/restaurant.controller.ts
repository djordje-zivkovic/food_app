import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createRestaurant(@Body() body: createRestaurantDto) {
    return this.restaurantService.create(
      body.address,
      body.category,
      body.photo,
      body.workinghours,
    );
  }
}
