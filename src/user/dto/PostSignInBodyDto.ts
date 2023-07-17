import { IsNotEmpty } from "class-validator";

export class PostSignInBodyDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  avatar: string;
}
