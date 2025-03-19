import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "./auth.middleware"; // Adjust the path as needed

jest.mock("jsonwebtoken");

const makeSut = (headers: Record<string, string> = {}) => {
  let res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }

  let req: Partial<Request> = { headers };

  let next: NextFunction = jest.fn();

  process.env.JWT_SECRET = "mysecret";

  return {sut: verifyToken, req, res, next }
}

describe("verifyToken middleware", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 when no token is provided", () => {
    // Given
    const { sut, req, res, next } = makeSut();

    // When
    sut(req as Request, res as Response, next);

    // Then
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token not provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 for a malformatted token", () => {
    // Given
    const { sut, req, res, next } = makeSut({ authorization: "InvalidToken" });

    // When
    sut(req as Request, res as Response, next);

    // Then
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token malformatted" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 when the token is invalid", () => {
    // Given
    const { sut, req, res, next } = makeSut({ authorization: "Bearer invalidtoken" });


    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error("invalid token"), null);
    });

    // When
    sut(req as Request, res as Response, next);

    // Then
    expect(jwt.verify).toHaveBeenCalledWith(
      "invalidtoken",
      process.env.JWT_SECRET,
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token invalid" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should set req.user and call next for a valid token", () => {
    // Given
    const { sut, req, res, next } = makeSut({ authorization: "Bearer validtoken" });

    const decodedPayload = { id: "user1", name: "John Doe", email: "john@example.com" };

    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, decodedPayload);
    });

    // When
    sut(req as Request, res as Response, next);

    // Then
    expect(jwt.verify).toHaveBeenCalledWith(
      "validtoken",
      process.env.JWT_SECRET,
      expect.any(Function)
    );
    expect((req as any).user).toEqual(decodedPayload);
    expect(next).toHaveBeenCalled();
  });
});
