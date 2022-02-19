import { Request, Response, NextFunction } from 'express';
import { insertImageRecipeService } from '../services/productsService';

const insertImageRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;
    const resp = insertImageRecipeService(name);
    return res.status(201).json(resp);
  } catch (error) {
    return next(error);
  }
}

export {
  insertImageRecipeController
};
