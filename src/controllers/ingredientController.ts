import { Request, Response, NextFunction } from 'express';
import { registerIngredientService } from '../services/ingredientsService';

const registerIngredientController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredient = await registerIngredientService(req.body);
    return res.status(201).json(ingredient)
  } catch (error) {
    next(error);
  }
};

export {
  registerIngredientController,
}
