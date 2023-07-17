import { User } from '@prisma/client';

export abstract class UserRepository {
  abstract signUp(
    name: string,
    email: string,
    password: string,
    avatar: string,
  ): Promise<User>;

  abstract emailIsInUse(password: string): Promise<Boolean>;

  abstract findByEmail(email: string): Promise<User>;
}
