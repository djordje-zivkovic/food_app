import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createRestaurant(@Body() body: CreateRestaurantDto) {
    return this.restaurantService.create(body);
  }

  @Delete(':id')
  deleteRestaurant(@Param('id', ParseIntPipe) id: number) {
    if (!id) {
      throw new BadRequestException('You have to enter id');
    }
    return this.restaurantService.deleteRestaurant(id);
  }

  @Roles(Role.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  updateRestaurant(
    @Body() body: UpdateRestaurantDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
  ) {
    return this.restaurantService.updateRestaurant(
      id,
      body,
      request.user.userId,
    );
  }

  @Get()
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }
}
