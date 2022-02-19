import express from 'express';
import authAdminMiddleware from '../middlewares/authAdminMiddleware';
import {
  deleteIngredientController,
  registerIngredientController,
  registerIngredientStockController,
  updateIngredientController
} from '../controllers/ingredientController';

const ingredientRoute = express.Router();

ingredientRoute.post('/stock', authAdminMiddleware, registerIngredientStockController);
ingredientRoute.post('/register', authAdminMiddleware, registerIngredientController);
ingredientRoute.delete('/delete', authAdminMiddleware, deleteIngredientController);
ingredientRoute.put('/update', authAdminMiddleware, updateIngredientController);

export default ingredientRoute;
