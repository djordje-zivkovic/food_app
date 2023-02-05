import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../guards/roles.guard';

@Controller('order')
export class OrderController {
  //     @Post()
  //   @Roles(Role.Admin)
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   createReview(@Body() body: CreateReviewDto, @Req() request) {
  //     return this.reviewService.create(body, request);
  //   }
  // @Post()
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // createOrder(@Body body: createOrderDto, @Req() request) {
  //     return this.orderService.create(body, request);
  // }
}
