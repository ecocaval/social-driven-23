import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../user-repository';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(
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

  async findByEmail(
    email: string
  ): Promise<Boolean> {
    const user = await this.prisma.user.findFirst({
        where: {
            email
        }
    })

    if(user) return true;

    return false;
  }
}
