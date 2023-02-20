import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateDailyMenuDto {
  @IsString()
  date: string;
  @IsNumber()
  restaurantId: number;
  @IsArray()
  mealId: number[];
}
