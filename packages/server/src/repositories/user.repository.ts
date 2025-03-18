import { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getUserByExternalId(externalId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { externalId } });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(data: {
    externalId: string;
    name?: string;
    email?: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
