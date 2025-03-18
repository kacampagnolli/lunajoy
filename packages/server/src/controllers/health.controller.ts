import { Request, Response } from "express";
import { HealthService } from "../services/health.service";
import { getSocketInstance } from "../socket/socket";

export class HealthController {
  private healthService: HealthService;

  constructor(healthService: HealthService) {
    this.healthService = healthService;
  }

  async createHealthRecord(req: Request, res: Response): Promise<void> {
    try {
      const record = await this.healthService.createRecord(req.body, req.user!.id);

      getSocketInstance().emit("newHealthLog", record);

      res.status(201).json({
        record
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getHealthRecords(_: Request, res: Response): Promise<void> {
    try {
      const records = await this.healthService.getRecords();
      res.json({
        data: records
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
