import { HealthController } from "../controllers/health.controller";
import prisma from "../config/database";
import { HealthRepository } from "../repositories/health.repository";
import { HealthService } from "../services/health.service";

export function createHealthModule(): {healthService: HealthService, healthController: HealthController} {
  const healthRepository = new HealthRepository(prisma);
  const healthService = new HealthService(healthRepository);
  const healthController = new HealthController(healthService);

  return {healthService, healthController}
}
