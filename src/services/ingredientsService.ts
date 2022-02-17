import { ingredientSchema } from '../schemas/schemas';
import { createErrorMessage } from '../utils/functions';
import { registerIngredientModel } from '../models/ingredientsModel';

interface IIngredient {
  name: string;
  unitOfMeasurement: string;
  unitPrice: number;
}
const validateRequestBody = (ingredient: IIngredient) => {
  const { error } = ingredientSchema.validate(ingredient);
  if (error) throw createErrorMessage(406, error.message);
}

const registerIngredientService = async (ingredient: IIngredient) => {
  validateRequestBody(ingredient);
  const { id } = await registerIngredientModel(ingredient);
  return {
    id,
    ...ingredient,
  }
};

export {
  registerIngredientService,
}
