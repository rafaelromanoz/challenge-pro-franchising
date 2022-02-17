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

export { registerIngredientModel };
