import { createErrorMessage } from "../utils/functions";
import { findIngredientByNameModel } from "../models/ingredientsModel"
import { insertQuantityInIngredientStockModel } from "../models/stockIngredientModel";

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
  await insertQuantityInIngredientStockModel(stock);
  return {
    message: `Product ${stock.name} has ${stock.quantity} `
  };

};

export {
  stockIngredientService,
}
