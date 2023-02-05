import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  atmosphere: string;
  @IsString()
  general_impression: string;
  @IsString()
  comment: string;
}
