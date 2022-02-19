import { createErrorMessage } from '../utils/functions';
import { createProductModel, findProductByNameModel } from '../models/productsModel';
import { verifyExistsIngredientsModel } from '../models/ingredientsModel';


interface IIngredients {
  name: string;
}

interface IProduct {
  name: string;
  price: number;
  ingredients: Array<IIngredients>;
}

const productExists = async (name: string) => {
  const foundProduct = await findProductByNameModel(name);
  if (!foundProduct) throw createErrorMessage(404, 'Product dont exists');
  return foundProduct;
}

const insertImageProductService = async (name: string) => {
  const product = await productExists(name);
  return {
    product,
    name,
  }
};

const getOnlyNameOfIngredientsForConsult = (ingredients: Array<IIngredients>) => {
  return ingredients.map(({ name }) => name);
}

const verifyIfExistsIngredients = async (ingredients: Array<IIngredients>) => {
  const arrayIngredients = getOnlyNameOfIngredientsForConsult(ingredients);
  const ingredientsFound = await verifyExistsIngredientsModel(arrayIngredients);
  if (ingredients.length !== ingredientsFound.length) {
    throw createErrorMessage(406, 'Dont have this ingredients');
 }
}

const verifyExistProduct = async (name: string) => {
  const product = await findProductByNameModel(name);
  if (product) throw createErrorMessage(406, 'This product already exists');
}

const insertProductService = async (product: IProduct) => {
  await verifyIfExistsIngredients(product.ingredients);
  await verifyExistProduct(product.name);
  const { id } = await createProductModel(product);
  return {
    id,
    ...product
  }
}

export {
  insertImageProductService,
  insertProductService,
}
