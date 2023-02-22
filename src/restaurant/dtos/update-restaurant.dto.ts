import { IsString } from 'class-validator';

export class UpdateRestaurantDto {
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
}
