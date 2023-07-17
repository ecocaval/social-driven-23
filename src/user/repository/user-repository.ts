import { User } from "@prisma/client";

export abstract class UserRepository {
    abstract create(name: string, email: string, password: string, avatar: string): Promise<User>

    abstract findByEmail(password: string): Promise<Boolean>
}