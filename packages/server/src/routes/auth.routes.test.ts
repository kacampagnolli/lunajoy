import express, { Request, Response, NextFunction } from "express";
import request from "supertest";
import { AuthRoutes } from "./auth.routes";
import { AuthController } from "../controllers/auth.controller";
import { mock } from "jest-mock-extended";
import passport from "passport";

const makeSut = () => {
  const passport = mock<passport.PassportStatic>();

  passport.authenticate.mockImplementation((strategy: string, options: any, callback?: any) => {
    if (options && options.session === false && options.failureRedirect === "/login") {
      return (req: Request, res: Response, next: NextFunction) => {
        req.user = { id: 1, name: "Test User", email: "test@example.com" };
        next();
      };
    }

    return (req: Request, res: Response, next: NextFunction) => {
      res.redirect("https://accounts.google.com/o/oauth2/auth");
    };
  });

  const authController = mock<AuthController>();

  const authRoutes = new AuthRoutes(authController, passport);

  let app = express();
  app.use(authRoutes.router);

  return { authController, passport, app }
}

describe("AuthRoutes", () => {

  it("should call passport.authenticate for /google and redirect to Google auth URL", async () => {
    // Given
    const { app, passport } = makeSut();

    // When
    const response = await request(app).get("/google");

    // Then
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("https://accounts.google.com/o/oauth2/auth");
    expect(passport.authenticate).toHaveBeenCalledWith("google", { scope: ["profile", "email"] });
  });

  it("should call passport.authenticate for /google/callback and invoke googleCallback to redirect to success URL with token", async () => {
    // Given
    const { app, passport, authController } = makeSut();

    authController.googleCallback.mockImplementation(async (req: Request, res: Response) => {
      res.redirect("http://localhost:5173/success?token=testToken");
    });

    // When
    const response = await request(app).get("/google/callback");

    // Then
    expect(response.status).toBe(302);
    expect(response.headers.location).toEqual("http://localhost:5173/success?token=testToken");

    expect(passport.authenticate).toHaveBeenCalledWith("google", { session: false, failureRedirect: "/login" });
    expect(authController.googleCallback).toHaveBeenCalled();
  });
});
