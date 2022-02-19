import { createErrorMessage } from '../utils/functions';
import { findProductByName } from '../models/productsModel';

const productExists = async (name: string) => {
  const foundProduct = await findProductByName(name);
  if (!foundProduct) throw createErrorMessage(404, 'Product dont exists');
}

const insertImageRecipeService = async (name: string) => {
  await productExists(name);
};

export {
  insertImageRecipeService,
}
