import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../enums/role.enum';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(
    email: string,
    password: string,
    name: string,
    surname: string,
    telephone_number: string,
    role: Role,
  ) {
    const user = this.repo.create({
      email,
      password,
      name,
      surname,
      telephone_number,
      role,
    });
    return this.repo.save(user);
  }

  async findAllUsers() {
    return await this.repo.find({
      relations: {
        restaurants: true,
        reviews: true,
        orders: true,
      },
    });
  }

  async findById(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: { restaurants: true },
    });
  }

  async findByEmail(email: string, includePassword = false) {
    return await this.repo
      .createQueryBuilder()
      .where({ email: email })
      .addSelect(includePassword ? 'User.password' : null)
      .getOne();
  }
}
