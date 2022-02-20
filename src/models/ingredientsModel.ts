import connection from './connection';

interface IIngredient {
  name: string;
  unitOfMeasurement: string;
  unitPrice: number;
}

interface IResponse {
  id: string;
}

const registerIngredientModel = async (ingredient: IIngredient): Promise<IResponse> => {
  const instanceDB = await connection();
  const { insertedId } = await instanceDB.collection('ingredients').insertOne({ ...ingredient });
  return {
    id: insertedId,
  }
};

const findIngredientByNameModel = async (name: string) => {
  const instanceDB = await connection();
  const foundIngredient = await instanceDB.collection('ingredients').findOne({ name });
  return foundIngredient;
}

const verifyExistsIngredientsModel = async (arrayIngredients: Array<string>) => {
  const instanceDB = await connection();
  const ingredientsFound = await instanceDB.collection('ingredients').find({
    name: {
      $in: arrayIngredients,
    },
  }).toArray();
  return ingredientsFound;
}

const updateIngredientModel = async (name: string, ingredient: IIngredient) => {
  const instanceDB = await connection();
  await instanceDB.collection('ingredients').updateOne({ name }, {
    $set: {
      ...ingredient,
    }
  })
}

const deleteIngredientModel = async (name: string) => {
  const instanceDB = await connection();
  await instanceDB.collection('ingredients').deleteOne({ name });
}

export default {
  registerIngredientModel,
  findIngredientByNameModel,
  verifyExistsIngredientsModel,
  updateIngredientModel,
  deleteIngredientModel,
};
