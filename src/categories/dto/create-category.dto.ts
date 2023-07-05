import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  // eslint-disable-next-line indent
  title: string;
  @IsOptional()
  // eslint-disable-next-line indent
  userId?: number;
}
