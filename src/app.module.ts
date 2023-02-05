import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { Restaurant } from './restaurant/restaurant.entity';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { JWTModule } from './auth/JWT.module';
import { ReviewModule } from './review/review.module';
import { Review } from './review/review.entity';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'food_app',
      entities: [User, Restaurant, Review],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    RestaurantModule,
    JWTModule,
    ReviewModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
