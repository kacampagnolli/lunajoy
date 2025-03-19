import { Request, Response } from "express";
import { HealthController } from "../controllers/health.controller";
import { HealthService } from "../services/health.service";
import { getSocketInstance } from "../socket/socket";
import { mock } from "jest-mock-extended";
import { CreateHealthLog } from "../schemas/health.schema";
import { HealthLog } from "@prisma/client";

jest.mock("../socket/socket", () => ({
  getSocketInstance: jest.fn().mockReturnValue({
    emit: jest.fn()
  })
}));

const makeSut = () => {
  const service = mock<HealthService>();
  const healthController = new HealthController(service);

  let res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  let req: Partial<Request> = {
    user: { id: 1, email: "john.doe@gmail.com", name: "John Doe" },
  };

  return {sut: healthController, service, req, res }
}

describe("HealthController", () => {

  test("should create a health record and emit a socket event", async () => {
    // Given
    const { sut, service, req, res } = makeSut();

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

    const mockRecord = { id: 1, ...data, createdAt: new Date(), userId: req.user!.id };

    service.createRecord.mockResolvedValue(mockRecord);

    req.body = data

    // Then
    await sut.createHealthRecord(req as Request, res as Response);


    // When
    expect(service.createRecord).toHaveBeenCalledWith(
      req.body,
      req.user?.id
    );

    expect(getSocketInstance().emit).toHaveBeenCalledWith("newHealthLog", mockRecord);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ record: mockRecord });
  });

  test("should handle errors when creating a health record", async () => {
    // Given
    const { sut, service, req, res } = makeSut();

    service.createRecord.mockRejectedValue(new Error("Database error"));

    // Then
    await sut.createHealthRecord(req as Request, res as Response);


    // When
    expect(service.createRecord).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });

  test("should retrieve health records", async () => {
     // Given
     const { sut, service, req, res } = makeSut();

    const mockRecords: HealthLog[] = [
      {
        id: 1,
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
        createdAt: new Date(),
        userId: 1
      }
    ];

    service.getRecords.mockResolvedValue(mockRecords);

    // When
    await sut.getHealthRecords(req as Request, res as Response);

    // Then
    expect(service.getRecords).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ data: mockRecords });
  });

  test("should handle errors when retrieving health records", async () => {
    // Given
    const { sut, service, req, res } = makeSut();

    service.getRecords.mockRejectedValue(new Error("Database error"));

    // When
    await sut.getHealthRecords(req as Request, res as Response);

    // Then
    expect(service.getRecords).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
