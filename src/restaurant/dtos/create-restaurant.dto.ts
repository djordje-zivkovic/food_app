import { IsNumber, IsString } from 'class-validator';

export class createRestaurantDto {
  @IsString()
  address: string;
  @IsString()
  workinghours: string;
  @IsString()
  category: string;
  @IsString()
  photo: string;
}
