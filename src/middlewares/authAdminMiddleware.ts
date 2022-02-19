import { validateToken } from "../auth/jwtConfig";
import { Request, Response, NextFunction } from "express";

type TPayload = {
  payload: {
    role: string,
    name: string;
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: "missing auth token" });
    const payload = validateToken(authorization) as TPayload;
    if (!payload) return res.status(201).json({ message: "jwt invalid" });
    const { payload: { role }  } = payload;
    if (role !== "admin") return res.status(401).json({ message: "user is not admin" });
    req.payload = {
      role,
      name: payload.payload.name,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "jwt malformed" });
  }
};
