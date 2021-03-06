import { createErrorMessage } from "../utils/functions";
import ingredientsModel from "../models/ingredientsModel"
import { updateQuantityStockModel } from "../models/stockIngredientModel";

const { findIngredientByNameModel } = ingredientsModel;
interface IStock {
  name: string;
  quantity: number;
}

const verifyExistIngredient = async (name: string) => {
  const ingredientFound = await findIngredientByNameModel(name);
  if (!ingredientFound) throw createErrorMessage(404, 'Ingredient dont exist');
}

const stockIngredientService = async (stock: IStock) => {
  await verifyExistIngredient(stock.name);
  await updateQuantityStockModel(stock);
  return {
    name: stock.name,
    stock: stock.quantity,
  };

};

export {
  stockIngredientService,
}
