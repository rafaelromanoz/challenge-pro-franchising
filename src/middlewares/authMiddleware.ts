import { validateToken } from '../auth/jwtConfig';
import { Request, Response, NextFunction } from 'express';

interface IPayload {
  payload: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'missing auth token' });
    const { payload } = validateToken(authorization) as IPayload;
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
