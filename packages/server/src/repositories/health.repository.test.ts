import { HealthRepository } from "./health.repository";
import { HealthLog } from "@prisma/client";
import { prismaMock } from '../tests/singleton'

const makeSut = (): {sut: HealthRepository} => {
  const healthRepository = new HealthRepository(prismaMock);

  return {sut: healthRepository}
}

describe("HealthRepository", () => {

  it("should create a health log", async () => {
    // Given
    const { sut } = makeSut();

    const data: Omit<HealthLog, "id" | "createdAt"> = {
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
      userId: 1
    };

    const fakeLog = { id: 1, ...data, createdAt: new Date(), userId: 1 };

    prismaMock.healthLog.create.mockResolvedValue(fakeLog);

    // When
    const result = await sut.createHealthRecord(data);

    //Then
    expect(result).toEqual(fakeLog);
    expect(prismaMock.healthLog.create).toHaveBeenCalledWith({ data });
  });

  it("should list health logs", async () => {
    // Given
    const { sut } = makeSut();

    const fakeLogs: HealthLog[] = [
      { id: 1, mood: 7, anxiety: 5, sleepHours: 8, sleepQuality: 8, sleepDisturbance: "none", physicalActivityType: "running", physicalActivityDuration: 30, socialInteractions: "daily", stress: 4, symptomDetails: "mild anxiety symptoms", createdAt: new Date(), userId: 1 }
    ];

    prismaMock.healthLog.findMany.mockResolvedValue(fakeLogs);

    // When
    const result = await sut.getHealthRecords();

    // Then
    expect(result).toEqual(fakeLogs);
    expect(prismaMock.healthLog.findMany).toHaveBeenCalled();
  });
});
