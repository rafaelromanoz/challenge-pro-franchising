import { createErrorMessage } from '../utils/functions';
import { createProductModel, findProductByNameModel, insertNameImageModel } from '../models/productsModel';
import { verifyExistsIngredientsModel } from '../models/ingredientsModel';


interface IIngredients {
  name: string;
}

interface IProduct {
  name: string;
  price: number;
  ingredients: Array<IIngredients>;
}

const verifyExistProduct = async (name: string) => {
  const product = await findProductByNameModel(name);
  if (product) throw createErrorMessage(406, 'This product already exists');
  return product;
}

const insertImageProductService = async (name: string, image: string) => {
  const product = await verifyExistProduct(name);
  await insertNameImageModel(name, image);
  return {
    product,
    name,
    image
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
