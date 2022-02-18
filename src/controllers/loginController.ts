import { Response, Request, NextFunction } from 'express';
import { loginService } from '../services/loginService';

const loginController = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const token = await loginService(req.body);
    return res.status(200).json(token)
  } catch (error) {
    return next(error);
  }
};

export {
  loginController,
}
