import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export function requireAuth(req: any, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  req.user = verifyToken(token);
  next();
}
