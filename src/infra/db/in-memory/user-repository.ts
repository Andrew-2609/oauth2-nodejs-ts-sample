import { User } from "@/domain/entities/user";
import { UserModel } from "@/domain/models/user";
import {
  AddUserRepository,
  GetUserById,
} from "@/domain/repositories/user-repository";

export class UserInMemoryRepository implements GetUserById, AddUserRepository {
  private users = new Map<string, UserModel>();
  private static instance: UserInMemoryRepository;

  public static getInstance(): UserInMemoryRepository {
    if (!UserInMemoryRepository.instance) {
      UserInMemoryRepository.instance = new UserInMemoryRepository();
    }
    return UserInMemoryRepository.instance;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    return new User(user);
  }

  async addUser(user: User): Promise<string> {
    const userId = user.getId();
    this.users.set(userId, user.toModel());
    return userId;
  }
}
