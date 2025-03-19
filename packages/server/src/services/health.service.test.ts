import { mock } from "jest-mock-extended";
import { HealthRepository } from "../repositories/health.repository";
import { HealthService } from "./health.service";
import { HealthLog } from "@prisma/client";
import { CreateHealthLog } from "../schemas/health.schema";

const makeSut = () => {
  const repository = mock<HealthRepository>();
  const healthService = new HealthService(repository);

  return {sut: healthService, repository }
}

describe("HealthRepository", () => {

  it("should create a health log", async () => {
    // Given
    const { sut, repository } = makeSut();

    const userId = 1;

    const data: CreateHealthLog = {
      mood: 7,
      anxiety: 5,
      sleepHours: 8,
      sleepQuality: 8,
      sleepDisturbance: "none",
      physicalActivityType: "running",
      physicalActivityDuration: 30,
      socialInteractions: "daily",
      stress: 4,
      symptomDetails: "mild anxiety symptoms",
    };

    const fakeLog = { id: 1, ...data, createdAt: new Date(), userId };

    repository.createHealthRecord.mockResolvedValue(fakeLog);

    // When
    const result = await sut.createRecord(data, 1);

    //Then
    expect(result).toEqual(fakeLog);
    expect(repository.createHealthRecord).toHaveBeenCalledWith({...data, userId });
  });

  it("should list health logs", async () => {
    // Given
    const { sut, repository } = makeSut();

    const fakeLogs: HealthLog[] = [
      { id: 1, mood: 7, anxiety: 5, sleepHours: 8, sleepQuality: 8, sleepDisturbance: "none", physicalActivityType: "running", physicalActivityDuration: 30, socialInteractions: "daily", stress: 4, symptomDetails: "mild anxiety symptoms", createdAt: new Date(), userId: 1 }
    ];

    repository.getHealthRecords.mockResolvedValue(fakeLogs);

    // When
    const result = await sut.getRecords();

    // Then
    expect(result).toEqual(fakeLogs);
    expect(repository.getHealthRecords).toHaveBeenCalled();
  });
});
