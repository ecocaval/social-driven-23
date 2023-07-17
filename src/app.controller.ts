import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostSignInBodyDto } from './dto/PostSignInBodyDto';
import { UserRepository } from './repository/user-repository';

@Controller()
export class AppController {
  constructor(private userRepository: UserRepository) {}

  @Post('signin')
  async getHello(@Body() body: PostSignInBodyDto) {

    const { name, email, password, avatar } = body;

    const newUser = await this.userRepository.create(
      name, email, password, avatar
    )

    return newUser;
  }
}
