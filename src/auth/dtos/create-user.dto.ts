import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../enums/role.enum';
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8)
  password: string;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsMobilePhone()
  @IsString()
  telephone_number: string;
  @IsEnum(Role)
  role: Role = Role.CLIENT;
}
