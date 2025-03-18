import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  async getUserByExternalId(googleId: string): Promise<User | null> {
    return this.userRepository.getUserByExternalId(googleId);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async createUser(data: {
    externalId: string;
    displayName?: string;
    email?: string;
  }): Promise<User> {
    return this.userRepository.createUser(data);
  }
}
