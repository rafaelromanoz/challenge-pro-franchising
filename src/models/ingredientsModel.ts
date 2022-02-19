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

export {
  registerIngredientModel,
  findIngredientByNameModel,
  verifyExistsIngredientsModel
};
