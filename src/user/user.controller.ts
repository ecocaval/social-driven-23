import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { PostSignUpBodyDto } from './dto/PostSignUpBodyDto';
import { UserService } from './user.service';
import { PostSignInBodyDto } from './dto/PostSignInBodyDto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('user')
  async signUp(@Body() body: PostSignUpBodyDto) {
    const { name, email, password, avatar } = body;

    return this.userService.signUp(name, email, password, avatar);
  }

  @Post('signin')
  async signIn(@Body() body: PostSignInBodyDto) {
    const { email, password} = body;

    return this.userService.signIn(email, password);
  }
}
