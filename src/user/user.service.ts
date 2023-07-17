import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user-repository';
import { PostPublicationDto } from './dto/PostPublicationDto';

interface JwtUserPayload extends jwt.JwtPayload {
  userId: number;
}

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  private HASH_SALT = 10;

  async signUp(name: string, email: string, password: string, avatar: string) {
    const emailIsAlreadyInUse = await this.userRepository.emailIsInUse(email);

    if (emailIsAlreadyInUse) {
      throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
    }

    password = await bcrypt.hash(password, this.HASH_SALT);

    const newUser = await this.userRepository.signUp(
      name,
      email,
      password,
      avatar,
    );

    return newUser;
  }

  async signIn(email: string, password: string) {
    const emailIsAlreadyInUse = await this.userRepository.emailIsInUse(email);

    if (!emailIsAlreadyInUse) {
      throw new HttpException(
        'No user found with this email',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.userRepository.findByEmail(email);

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      throw new HttpException(
        'Incorrect password for this email',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = jwt.sign(
      { userId: user.id },
      String(process.env.JWT_PRIVATE_KEY),
      { expiresIn: '12h' },
    );

    return {
      data: token,
    };
  }

  async findAllUserPublications(
    authHeader: string,
  ) {
    if (!authHeader.startsWith('Bearer')) {
      throw new HttpException(
        'Token must be Bearer Type',
        HttpStatus.UNAUTHORIZED,
      );
    }

    authHeader = authHeader.replace('Bearer ', '');

    const { userId } = jwt.verify(
      authHeader,
      String(process.env.JWT_PRIVATE_KEY),
    ) as JwtUserPayload;

    return this.userRepository.findAllUserPublications(userId);
  }

  async createPublication(
    pulicationDto: PostPublicationDto,
    authHeader: string,
  ) {
    if (!authHeader.startsWith('Bearer')) {
      throw new HttpException(
        'Token must be Bearer Type',
        HttpStatus.UNAUTHORIZED,
      );
    }

    authHeader = authHeader.replace('Bearer ', '');

    const { userId } = jwt.verify(
      authHeader,
      String(process.env.JWT_PRIVATE_KEY),
    ) as JwtUserPayload;

    return this.userRepository.createPublication(pulicationDto, userId);
  }
}
