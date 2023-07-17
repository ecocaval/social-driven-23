import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class PostPublicationDto {
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  text: string;
  @IsNotEmpty()
  dateToPublish: string;
  @IsNotEmpty()
  published: boolean;
  @IsNotEmpty()
  socialMedia: string;
}
