import { PrismaClient, HealthLog } from "@prisma/client";

export class HealthRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async createHealthRecord(data: Omit<HealthLog, "id" | "createdAt">, ): Promise<HealthLog> {
    return this.prisma.healthLog.create({ data });
  }

  async getHealthRecords(): Promise<HealthLog[]> {
    return this.prisma.healthLog.findMany();
  }
}
