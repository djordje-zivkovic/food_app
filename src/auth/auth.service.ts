import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Role } from 'src/enums/role.enum';
import { User } from 'src/users/user.entity';
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

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(pass, salt, 32)) as Buffer;

    if (storedHash === hash.toString('hex')) {
      const { password, ...result } = user; // get all information from user except from password
      return result;
    }
    return null;
  }

  async signup(
    email: string,
    password: string,
    name: string,
    surname: string,
    telephone_number: string,
    role: Role,
  ) {
    let user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user1 = await this.usersService.create(
      email,
      result,
      name,
      surname,
      telephone_number,
      role,
    );
    return this.login(user1);
  }

  async login(user: User) {
    const payload = { sub: user.id, name: user.name, role: user.role };
    console.log('login-payload', payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
