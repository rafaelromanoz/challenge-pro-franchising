import { ingredientSchema } from '../schemas/schemas';
import { createErrorMessage } from '../utils/functions';
import { deleteIngredientModel, findIngredientByNameModel, registerIngredientModel, updateIngredientModel } from '../models/ingredientsModel';

interface IIngredient {
  name: string;
  unitOfMeasurement: string;
  unitPrice: number;
}
const validateRequestBody = (ingredient: IIngredient) => {
  const { error } = ingredientSchema.validate(ingredient);
  if (error) throw createErrorMessage(406, error.message);
}

const verifyExistsIngredient = async (name: string) => {
  const ingredientFound = await findIngredientByNameModel(name);
  if (ingredientFound) throw createErrorMessage(400, 'Ingredient already exists');
}

const verifyDontExistsIngredient = async (name: string) => {
  const ingredientFound = await findIngredientByNameModel(name);
  if (!ingredientFound) throw createErrorMessage(404, 'Ingredient dont exist');
}

const registerIngredientService = async (ingredient: IIngredient) => {
  validateRequestBody(ingredient);
  await verifyExistsIngredient(ingredient.name);
  const { id } = await registerIngredientModel(ingredient);
  return {
    id,
    ...ingredient,
  }
};

const updateIngredientService = async (name:string, ingredient: IIngredient) => {
  validateRequestBody(ingredient);
  await verifyDontExistsIngredient(name);
  await updateIngredientModel(name, ingredient);
  return {
    ...ingredient,
  }
}

const deleteIngredientService = async (name: string) => {
  await verifyDontExistsIngredient(name);
  await deleteIngredientModel(name);
}

export {
  registerIngredientService,
  deleteIngredientService,
  updateIngredientService,
}
