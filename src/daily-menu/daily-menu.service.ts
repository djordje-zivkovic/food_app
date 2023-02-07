import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyMenu } from './daily-menu.entity';
import { CreateDailyMenuDto } from './dtos/create-dailymenu.dto';

@Injectable()
export class DailyMenuService {
  constructor(
    @InjectRepository(DailyMenu) private repo: Repository<DailyMenu>,
  ) {}

  async create(dailyMenuDto: CreateDailyMenuDto) {
    const dailyMenu = this.repo.create(dailyMenuDto);
    return this.repo.save(dailyMenu);
  }
}
