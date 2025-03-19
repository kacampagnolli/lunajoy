import { createHealthModule } from "./health.factory";
import { HealthController } from "../controllers/health.controller";
import { HealthService } from "../services/health.service";

describe("createHealthModule", () => {
  it("should return an object with healthController as an instance of HealthController and healthService as an instance of HealthService", () => {
    const { healthController, healthService } = createHealthModule();
    expect(healthController).toBeInstanceOf(HealthController);
    expect(healthService).toBeInstanceOf(HealthService);
  });
});
