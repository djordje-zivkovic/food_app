import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyMenuController } from './daily-menu.controller';
import { DailyMenu } from './daily-menu.entity';
import { DailyMenuService } from './daily-menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([DailyMenu])],
  controllers: [DailyMenuController],
  providers: [DailyMenuService],
})
export class DailyMenuModule {}
