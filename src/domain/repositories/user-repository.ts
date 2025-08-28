import { User } from "@/domain/entities/user";

export interface GetUserById {
  getUserById: (id: string) => Promise<User | null>;
}

export interface AddUserRepository {
  addUser: (user: User) => Promise<string>;
}
