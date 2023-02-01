import { Injectable } from '@nestjs/common';
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

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }
}
