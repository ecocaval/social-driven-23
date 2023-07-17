import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserRepository } from './repository/user-repository';
import { PostSignInBodyDto } from './dto/PostSignInBodyDto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('user')
  async getHello(@Body() body: PostSignInBodyDto) {
    const { name, email, password, avatar } = body;

    return this.userService.create(name, email, password, avatar);
  }
}
