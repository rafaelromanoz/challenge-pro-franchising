import express from 'express';
import authAdminMiddleware from '../middlewares/authAdminMiddleware';
import ingredientsController from '../controllers/ingredientController';

const {
  registerIngredientStockController,
  registerIngredientController,
  deleteIngredientController,
  updateIngredientController
} = ingredientsController;

const ingredientRoute = express.Router();

ingredientRoute.post('/stock', authAdminMiddleware, registerIngredientStockController);
ingredientRoute.post('/register', authAdminMiddleware, registerIngredientController);
ingredientRoute.delete('/delete', authAdminMiddleware, deleteIngredientController);
ingredientRoute.put('/update', authAdminMiddleware, updateIngredientController);

export default ingredientRoute;
