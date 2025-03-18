import { HealthRepository } from "../repositories/health.repository";
import { HealthLog } from "@prisma/client"
import { CreateHealthLog } from "../schemas/health.schema";

export class HealthService {
  private healthRepository: HealthRepository;

  constructor(repository: HealthRepository) {
    this.healthRepository = repository;
  }

  async createRecord(data: CreateHealthLog, userId: number): Promise<HealthLog> {
    return this.healthRepository.createHealthRecord({...data, userId});
  }

  async getRecords(): Promise<HealthLog[]> {
    return this.healthRepository.getHealthRecords();
  }
}
