import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

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
}
