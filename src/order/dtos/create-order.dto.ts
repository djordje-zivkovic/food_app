import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  date: string;
  @IsArray()
  dailyMenuId: number[];
  @IsNumber()
  portions: number;
}
