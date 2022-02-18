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

// const findIngredientsModel = async (ingredients) => {
//   const instanceDB = await connection();
//   const ingredientsFound = await instanceDB.collection('ingredients').find({
//     name: {
//       $in: ingredients,
//     }
//   })
//   return ingredientsFound;
// };

export { registerIngredientModel, findIngredientByNameModel };
