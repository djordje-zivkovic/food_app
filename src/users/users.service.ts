import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {
    const user = this.repo.create({
      email,
      password,
      name,
      surname,
      telephone_number,
    });
    return this.repo.save(user);
  }

  async FindById(id: number) {
    const user1 = await this.repo.findOneBy({ id });
    if (!user1) {
      throw new NotFoundException('User not found');
    }
    return user1;
  }

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }
}
