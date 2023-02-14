import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class updateRestaurantDto {
  @IsString()
  address: string;
  @IsString()
  workinghours: string;
  @IsString()
  category: string;
  @IsString()
  photo: string;
}
