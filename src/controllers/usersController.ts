import { Request, Response, NextFunction } from 'express';
import { registerOwnerService, registerShopkeeperService } from '../services/usersService';

const registerOwnerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerOwnerService(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

const registerShopkeeperController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerShopkeeperService(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

export {
  registerOwnerController,
  registerShopkeeperController,
}
