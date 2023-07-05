import { Category } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  // eslint-disable-next-line indent
  name: string;

  @IsOptional()
  @IsString()
  // eslint-disable-next-line indent
  description: string;

  @IsNotEmpty()
  @IsString()
  // eslint-disable-next-line indent
  dateStart: string;

  @IsNotEmpty()
  @IsString()
  // eslint-disable-next-line indent
  dateEnd: string;

  @IsNotEmpty()
  // eslint-disable-next-line indent
  category: Category;
}
