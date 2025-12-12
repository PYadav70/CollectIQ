import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js"; 

// lightweight local extension if you don't want global augmentation
type ReqWithUser = Request & { userId?: string };

export const userMiddleware = (req: ReqWithUser, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  console.log("Authorization Header:", header);

  if (!header || typeof header !== "string" || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or malformed" });
  }

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded can be string or object; ensure it's an object with id
    if (typeof decoded !== "object" || decoded === null) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    // prefer common keys: id, userId, sub
    const id = (decoded as any).id ?? (decoded as any).userId ?? (decoded as any).sub;
    if (!id) return res.status(403).json({ message: "Token payload missing user id" });

    req.userId = String(id);
    return next();
  } catch (err: any) {
    console.log("JWT verification error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
