import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validate } from "./validate.middleware"; // Adjust the path as needed

const makeSut = (body: Record<string, any> = {}) => {
  let res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }

  let req: Partial<Request> = { body };

  let next: NextFunction = jest.fn();

  return {sut: validate, req, res, next }
}

describe("validate middleware", () => {

  it("should call next if validation passes", () => {
    // Given
    const { sut, req, res, next } = makeSut({ name: "John" });

    const schema = z.object({ name: z.string() });

    // When
    const middleware = sut(schema);
    middleware(req as Request, res as Response, next);

    // Then
    expect(next).toHaveBeenCalled();
  });

  it("should return 400 and error details if validation fails with ZodError", () => {
    // Given
    const { sut, req, res, next } = makeSut({ name: 123 });
    const schema = z.object({ name: z.string() });

    // When
    const middleware = sut(schema);
    middleware(req as Request, res as Response, next);

    // Then
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid data",
      details: expect.arrayContaining([
        expect.objectContaining({ message: expect.stringContaining("name") })
      ]),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 500 if a non-ZodError is thrown", () => {
    // Given
    const { sut, req, res, next } = makeSut({ name: "John" });

    const schema = {
      parse: () => {
        throw new Error("Unexpected error");
      },
    } as unknown as z.ZodObject<any, any>;

    // When
    const middleware = sut(schema);
    middleware(req as Request, res as Response, next);

    // Then
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    expect(next).not.toHaveBeenCalled();
  });
});
