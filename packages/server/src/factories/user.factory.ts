import prisma from "../config/database";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";

export function createUserModule(): {userService: UserService} {
  const userRepository = new UserRepository(prisma);
  const userService = new UserService(userRepository);

  return {userService}
}
