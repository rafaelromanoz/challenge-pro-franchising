import express from 'express';
import { registerIngredientController } from '../controllers/ingredientController';

const ingredientRoute = express.Router();

ingredientRoute.post('/', registerIngredientController);

export default ingredientRoute;
