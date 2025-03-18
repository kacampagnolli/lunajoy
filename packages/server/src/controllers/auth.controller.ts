import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export class AuthController {
  async googleCallback(req: Request, res: Response): Promise<void> {

    const user = req.user as any;

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.redirect(`http://localhost:5173/success?token=${token}`);
  }
}
