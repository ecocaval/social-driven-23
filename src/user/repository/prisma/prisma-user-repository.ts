import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../user-repository';
import { Injectable } from '@nestjs/common';
import { Publication, User } from '@prisma/client';
import { PostPublicationDto } from 'src/user/dto/PostPublicationDto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async signUp(
    name: string,
    email: string,
    password: string,
    avatar: string,
  ): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        avatar,
      },
    });
  }

  async emailIsInUse(email: string): Promise<Boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) return true;

    return false;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findAllUserPublications(userId: number): Promise<Publication[]> {
    return await this.prisma.publication.findMany({
      where: {
        userId,
      },
    });
  }

  async createPublication(
    publication: PostPublicationDto,
    userId: number,
  ): Promise<Publication> {
    const { image, title, text, dateToPublish, published, socialMedia } = publication;

    return await this.prisma.publication.create({
      data: {
        image,
        title,
        text,
        dateToPublish,
        published,
        socialMedia,
        userId,
      },
    });
  }
}
