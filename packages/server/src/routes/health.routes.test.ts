import express from "express";
import request from "supertest";
import { HealthRoutes } from "./health.routes";
import { HealthController } from "../controllers/health.controller";
import { mock } from "jest-mock-extended";
import { CreateHealthLog } from "../schemas/health.schema";


const makeSut = () => {
  const healthController = mock<HealthController>();

  const healthRoutes = new HealthRoutes(healthController);

  let app = express();
  app.use(express.json());
  app.use(healthRoutes.router);

  return { healthController, app }
}

describe("HealthRoutes Integration Test", () => {

  it("should return 201 and call createHealthRecord on POST / with valid payload", async () => {
    // Given
    const { app, healthController } = makeSut();

    const validPayload: CreateHealthLog = {
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

    const mockLog = {id: 1, ...validPayload, userId: 1}

    healthController.createHealthRecord.mockImplementation(async (req, res) => {
      res.status(201).json({ record: mockLog });
    });

    // When
    const response = await request(app)
      .post("/")
      .send(validPayload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("record");
    expect(response.body.record).toEqual(mockLog);
    expect(healthController.createHealthRecord).toHaveBeenCalled();
  });

  it("should return 400 with error details on POST / when payload is invalid", async () => {
    // Given
    const { app, healthController } = makeSut();
    const invalidPayload = { data: 123 };

    // When
    const response = await request(app)
      .post("/")
      .send(invalidPayload);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid data");
    expect(response.body).toHaveProperty("details");
    expect(Array.isArray(response.body.details)).toBe(true);
    expect(healthController.createHealthRecord).not.toHaveBeenCalled();
  });

  it("should return 200 and call getHealthRecords on GET /", async () => {
    // Given
    const { app, healthController } = makeSut();

    const mockLog = {
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
      userId: 1
    }

    healthController.getHealthRecords.mockImplementation(async (req, res) => {
      res.status(200).json({ data: [mockLog] });
    });

    // When
    const response = await request(app).get("/");

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0]).toEqual(mockLog);
    expect(healthController.getHealthRecords).toHaveBeenCalled();
  });
});
