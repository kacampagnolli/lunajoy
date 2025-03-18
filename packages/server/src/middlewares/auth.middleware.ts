import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader) {

    const [scheme, token] = authHeader!.split(" ");
    if (!token || !/^Bearer$/i.test(scheme)) {
    res.status(401).json({ message: "Token malformatted" });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Token invalid" });
      (req as any).user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "Token not provided" });
  }
};
