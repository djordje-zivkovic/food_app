import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Category } from '../../enums/category.enum';

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
  @IsEnum(Category)
  category: Category;
}
