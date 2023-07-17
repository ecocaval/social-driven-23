import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user-repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async create(name: string, email: string, password: string, avatar: string) {

    const emailIsAlreadyInUse = await this.userRepository.findByEmail(email);

    if (emailIsAlreadyInUse) {
      throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
    }

    const newUser = await this.userRepository.create(
      name,
      email,
      password,
      avatar
    );

    return newUser;
  }
}
