import { Body, Controller, Get, Headers, Post } from '@nestjs/common';

import { PostSignUpBodyDto } from './dto/PostSignUpBodyDto';
import { UserService } from './user.service';
import { PostSignInBodyDto } from './dto/PostSignInBodyDto';
import { PostPublicationDto } from './dto/PostPublicationDto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('publication')
  async findAllUserPublications(
    @Headers('authorization') authHeader: string
  ) {
    return this.userService.findAllUserPublications(authHeader);
  }

  @Post('user')
  async signUp(@Body() body: PostSignUpBodyDto) {
    const { name, email, password, avatar } = body;

    return this.userService.signUp(name, email, password, avatar);
  }

  @Post('signin')
  async signIn(@Body() body: PostSignInBodyDto) {
    const { email, password } = body;

    return this.userService.signIn(email, password);
  }

  @Post('publication')
  async createPublication(
    @Headers('authorization') authHeader: string,
    @Body() body: PostPublicationDto,
  ) {
    return this.userService.createPublication(body, authHeader);
  }
}
