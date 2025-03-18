import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";
import { PassportStatic } from "passport";

export class AuthRoutes {
  public router: Router;
  private authController: AuthController;
  private passport: PassportStatic;

  constructor(authController: AuthController, passport: PassportStatic) {
    this.router = Router();
    this.passport = passport

    this.authController = authController

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      "/google",
      this.passport.authenticate("google", { scope: ["profile", "email"] })
    );

    this.router.get(
      "/google/callback",
      this.passport.authenticate("google", { session: false, failureRedirect: "/login" }),
      (req: Request, res: Response) => this.authController.googleCallback(req, res)
    );
  }
}
