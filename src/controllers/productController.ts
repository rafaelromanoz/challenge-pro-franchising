import { Request, Response, NextFunction } from 'express';
import { getAllProductsIngredientsAndStock } from '../models/productsModel';
import {
  insertImageProductService,
  insertProductService,
  verifyDontExistProduct
} from '../services/productsService';

interface IQuery {
  name: string;
}

interface IFile {
  originalname: string;
}

const insertImageRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query as unknown as IQuery;
    const { originalname } = req.file as IFile;
    const resp = await insertImageProductService(name, originalname);
    return res.status(201).json(resp);
  } catch (error) {
    return next(error);
  }
};

const insertProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await insertProductService(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }

}

const verifyProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query as unknown as IQuery;
    const product = await verifyDontExistProduct(name);
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await getAllProductsIngredientsAndStock();
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

export {
  insertImageRecipeController,
  insertProductController,
  verifyProductController,
  getAllProductsController,
};
