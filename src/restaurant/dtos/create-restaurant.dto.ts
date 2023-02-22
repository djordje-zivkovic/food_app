import { IsNumber, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsString()
  workinghours: string;
  @IsString()
  category: string;
  @IsString()
  photo: string;
  @IsNumber()
  userId: number;
}
