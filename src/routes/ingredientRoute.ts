import express from 'express';
import authAdminMiddleware from '../middlewares/authAdminMiddleware';
import {
  registerIngredientController,
  registerIngredientStockController
} from '../controllers/ingredientController';

const ingredientRoute = express.Router();

ingredientRoute.post('/stock', authAdminMiddleware, registerIngredientStockController )
ingredientRoute.post('/register', authAdminMiddleware, registerIngredientController);

export default ingredientRoute;
