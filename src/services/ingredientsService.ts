import { ingredientSchema } from '../schemas/schemas';
import { createErrorMessage } from '../utils/functions';
import ingredientsModel from '../models/ingredientsModel';

const {
  deleteIngredientModel,
  findIngredientByNameModel,
  registerIngredientModel,
  updateIngredientModel,
} = ingredientsModel;
interface IIngredient {
  name: string;
  unitOfMeasurement: string;
  unitPrice: number;
}
const validateRequestBody = (ingredient: IIngredient) => {
  const { error } = ingredientSchema.validate(ingredient);
  if (error) throw createErrorMessage(406, error.message);
}

const verifyExistsIngredient = async (ingredientFound: IIngredient | null) => {
  if (ingredientFound) throw createErrorMessage(400, 'Ingredient already exists');
}

const verifyDontExistsIngredient = async (ingredientFound: IIngredient | null) => {
  if (!ingredientFound) throw createErrorMessage(404, 'Ingredient dont exist');
}

const registerIngredientService = async (ingredient: IIngredient) => {
  const ingredientFound = await findIngredientByNameModel(ingredient.name);
  validateRequestBody(ingredient);
  await verifyExistsIngredient(ingredientFound);
  await registerIngredientModel(ingredient);
  return {
    ...ingredient,
  }
};

const updateIngredientService = async (name: string, ingredient: IIngredient) => {
  const ingredientFound = await findIngredientByNameModel(ingredient.name);
  validateRequestBody(ingredient);
  await verifyDontExistsIngredient(ingredientFound);
  await updateIngredientModel(name, ingredient);
  return {
    ...ingredient,
  }
}

const deleteIngredientService = async (name: string) => {
  const ingredientFound = await findIngredientByNameModel(name);
  await verifyDontExistsIngredient(ingredientFound);
  await deleteIngredientModel(name);
}

export default {
  registerIngredientService,
  deleteIngredientService,
  updateIngredientService,
  validateRequestBody,
  verifyDontExistsIngredient,
  verifyExistsIngredient,
  createErrorMessage,
}
