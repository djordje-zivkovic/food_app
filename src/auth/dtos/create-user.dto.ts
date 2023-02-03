import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsString,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsMobilePhone()
  @IsString()
  telephone_number: string;
  @IsEnum(Role)
  role: Role;
}
