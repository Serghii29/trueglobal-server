import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  // eslint-disable-next-line indent
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password will be then 8 symbol' })
  // eslint-disable-next-line indent
  password: string;

  @IsString()
  // eslint-disable-next-line indent
  name: string;
}
