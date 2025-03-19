import { Request, Response } from "express";
import { AuthController } from "./auth.controller";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("testToken"),
}));

const makeSut = () => {
  const authController = new AuthController();

  let res: Partial<Response> = {
    redirect: jest.fn(),
  };

  let req: Partial<Request> = {
    user: { id: 1, email: "john.doe@gmail.com", name: "John Doe" },
  };

  process.env.JWT_SECRET = "mysecret";

  return {sut: authController, req, res }
}

describe("HealthController", () => {

  it("should generate a token and redirect to the success URL", async () => {
    //Given
    const { sut, req, res } = makeSut();

    // When
    await sut.googleCallback(req as Request, res as Response);

    // Then
    expect(jwt.sign).toHaveBeenCalledWith(
      req.user,
      "mysecret",
      { expiresIn: "1h" }
    );

    expect(res.redirect).toHaveBeenCalledWith("http://localhost:5173/success?token=testToken");
  });
});
