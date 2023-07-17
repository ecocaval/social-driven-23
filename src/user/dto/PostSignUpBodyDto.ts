import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class PostSignUpBodyDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
  @IsNotEmpty()
  avatar: string;
}
