import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { User } from '../users/user.entity';
import { promisify } from 'util';
import { UsersService } from '../users/users.service';
import { EmailConfirmationService } from '../email/emailConfirmation.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Role } from '../enums/role.enum';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailConfirmationService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email, true);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(pass, salt, 32)) as Buffer;

    if (storedHash === hash.toString('hex')) {
      const result = { ...user };
      delete result.password;
      return result;
    }
    return null;
  }

  async signup(body: CreateUserDto) {
    const user = await this.usersService.findByEmail(body.email);
    if (user) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const newUser = {
      email: body.email,
      password: result,
      name: body.name,
      surname: body.surname,
      telephone_number: body.telephone_number,
      role: body.role,
    };

    const user1 = await this.usersService.create(newUser);
    await this.emailService.sendVerificationLink(body.email);
    if (newUser.role === Role.CLIENT) {
      return this.login(user1);
    } else {
      return 'New User is created';
    }
  }

  async login(user: User) {
    const payload = { userId: user.id, name: user.name, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
