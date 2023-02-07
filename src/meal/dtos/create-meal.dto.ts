import { IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateMealDto {
  @IsString()
  description: string;
  @IsString()
  name: string;
  @IsString()
  price: string;
  @IsString()
  photo: string;
  @IsNumber()
  restaurantId: number;
}
