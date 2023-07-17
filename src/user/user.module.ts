import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../database/prisma.service';
import { UserRepository } from './repository/user-repository';
import { PrismaUserRepository } from './repository/prisma/prisma-user-repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AppModule {}
