import { createErrorMessage } from '../utils/functions';
import {
  createProductModel,
  deleteProductModel,
  findProductByNameModel,
  insertNameImageModel,
  updateProductModel
} from '../models/productsModel';
import ingredientsModel from '../models/ingredientsModel';
import { productSchema } from '../schemas/schemas';

const { verifyExistsIngredientsModel } = ingredientsModel;

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

const verifyDontExistProduct = async (name: string) => {
  const product = await findProductByNameModel(name);
  if (!product) throw createErrorMessage(406, 'This product dont exists');
  return product;
}

const insertImageProductService = async (name: string, image: string) => {
  await verifyDontExistProduct(name);
  await insertNameImageModel(name, image);
  return {
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

const verifySchemaProduct = (product: IProduct) => {
  const { error } = productSchema.validate(product);
  if (error) throw createErrorMessage(406, error.message);
}

const insertProductService = async (product: IProduct) => {
  verifySchemaProduct(product);
  await verifyIfExistsIngredients(product.ingredients);
  await verifyExistProduct(product.name);
  const { id } = await createProductModel(product);
  return {
    id,
    ...product
  }
}

const updateProductService = async (name: string, product: IProduct) => {
  verifySchemaProduct(product);
  await verifyDontExistProduct(name);
  await verifyIfExistsIngredients(product.ingredients);
  await updateProductModel(name, product);
  return {
    ...product,
  }
}

const deleteProductService = async (name: string) => {
  await verifyDontExistProduct(name);
  await deleteProductModel(name);
}

export {
  insertImageProductService,
  insertProductService,
  verifyDontExistProduct,
  deleteProductService,
  updateProductService,
}
