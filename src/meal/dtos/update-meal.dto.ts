import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { Category } from '../../enums/category.enum';

export class UpdateMealDto {
  @IsOptional()
  @IsString()
  description: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  price: string;
  @IsString()
  @IsOptional()
  photo: string;
  @IsEnum(Category)
  @IsOptional()
  category: Category;
}
