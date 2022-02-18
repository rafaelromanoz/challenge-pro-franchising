import { Request, Response, NextFunction } from 'express';
import { registerOwnerService } from '../services/usersService';

const registerOwnerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerOwnerService(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

export {
  registerOwnerController,
}
