import { IsEmail, IsMobilePhone, IsString, MinLength } from 'class-validator';
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
}
