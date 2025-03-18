import { AuthController } from "../controllers/auth.controller";

export function createAuthModule(): {authController: AuthController} {

  const authController = new AuthController();

  return {authController}
}
