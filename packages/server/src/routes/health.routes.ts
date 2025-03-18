import { Router, Request, Response } from "express";
import { validate } from "../middlewares/validate.middleware";
import { createHealthLogSchema } from "../schemas/health.schema";
import { HealthController } from "../controllers/health.controller";

export class HealthRoutes {
  public router: Router;
  public healthController: HealthController;

  constructor(healthController: HealthController) {
    this.router = Router();
    this.healthController = healthController;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", validate(createHealthLogSchema),  (req: Request, res: Response) =>
      this.healthController.createHealthRecord(req, res)
    );
    this.router.get("/", (req: Request, res: Response) =>
      this.healthController.getHealthRecords(req, res)
    );
  }
}
