import { Publication, User } from '@prisma/client';
import { PostPublicationDto } from '../dto/PostPublicationDto';

export abstract class UserRepository {
  abstract signUp(
    name: string,
    email: string,
    password: string,
    avatar: string,
  ): Promise<User>;

  abstract emailIsInUse(password: string): Promise<Boolean>;

  abstract findByEmail(email: string): Promise<User>;

  abstract findAllUserPublications(userId: number): Promise<Publication[]>;

  abstract createPublication(publication: PostPublicationDto, userId: number): Promise<Publication>;
}
