import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return user;
  }
  async signup(email: string, password: string) {
    let user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('email in use');
    }

    // hash the users password //

    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // create a new user and save it
    const user1 = await this.usersService.create(email, result);
    // return the user
    return user1;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const payload = { userId: user.id };

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    } else {
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
