import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { UserRepository } from './repository/user-repository';
import { PrismaUserRepository } from './repository/prisma/prisma-user-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService,
  {
    provide: UserRepository,
    useClass: PrismaUserRepository
  }],
})
export class AppModule {}
