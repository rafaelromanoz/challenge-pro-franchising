import { ingredientSchema } from '../schemas/schemas';
import { createErrorMessage } from '../utils/functions';
import { findIngredientByNameModel, registerIngredientModel } from '../models/ingredientsModel';

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

const registerIngredientService = async (ingredient: IIngredient) => {
  validateRequestBody(ingredient);
  await verifyExistsIngredient(ingredient.name);
  const { id } = await registerIngredientModel(ingredient);
  return {
    id,
    ...ingredient,
  }
};

export {
  registerIngredientService,
}
