import { IsString } from 'class-validator';

export class CreateDailyMenuDto {
  @IsString()
  date: string;
}
