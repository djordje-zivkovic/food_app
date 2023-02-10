import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { createRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createRestaurant(@Body() body: createRestaurantDto) {
    return this.restaurantService.create(body);
  }

  @Delete(':id')
  deleteRestaurant(@Param('id') id) {
    console.log(id);
    if (!id) {
      throw new BadRequestException('You have to enter id');
    }
    return this.restaurantService.deleteRestaurant(id);
  }

  @Get()
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }
}
