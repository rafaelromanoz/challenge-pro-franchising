import { Request, Response, NextFunction } from 'express';
import { stockIngredientService } from '../services/stockIngredientService';
import ingredientsService from '../services/ingredientsService';

const {
  updateIngredientService,
  registerIngredientService,
  deleteIngredientService
} = ingredientsService;
interface IQuery {
  name: string;
}

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
    const stock = await stockIngredientService(req.body);
    return res.status(201).json(stock);
  } catch (error) {
    return next(error);
  }
}

const updateIngredientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query as unknown as IQuery;
    const productUpdated = await updateIngredientService(name, req.body);
    return res.status(200).json(productUpdated);
  } catch (error) {
    return next(error);
  }
}

const deleteIngredientController = async  (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query as unknown as IQuery;
    await deleteIngredientService(name);
    return res.status(200).json();
  } catch (error) {
    return next(error);
  }
}



export default {
  registerIngredientController,
  registerIngredientStockController,
  deleteIngredientController,
  updateIngredientController,
}
