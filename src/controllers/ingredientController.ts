import { Request, Response, NextFunction } from 'express';
import { stockIngredientService } from '../services/stockIngredientService';
import { registerIngredientService } from '../services/ingredientsService';

const registerIngredientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredient = await registerIngredientService(req.body);
    return res.status(201).json(ingredient)
  } catch (error) {
    next(error);
  }
};

const registerIngredientStockController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await stockIngredientService(req.body);
    return res.status(201).json(message);
  } catch (error) {
    return next(error);
  }
}

export {
  registerIngredientController,
  registerIngredientStockController,
}
