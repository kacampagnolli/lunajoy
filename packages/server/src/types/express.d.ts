import "express";

declare global {
  namespace Express {
    interface User {
      id: number;
      name: string | null;
      email: string | null;
    }
  }
}
