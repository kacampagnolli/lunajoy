import { createAuthModule } from "./auth.factory";
import { AuthController } from "../controllers/auth.controller";

describe("createAuthModule", () => {
  it("should return an object with authController being an instance of AuthController", () => {
    const { authController } = createAuthModule();
    expect(authController).toBeInstanceOf(AuthController);
  });
});
