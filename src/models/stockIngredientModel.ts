import connection from "./connection";

interface IQuantity {
  name: string,
  quantity: number,
}

const insertQuantityInIngredientStockModel = async (quantity: IQuantity) => {
  const instanceDB = await connection();
  const { insertedId } = await instanceDB.collection('stockIngredient').insertOne({ ...quantity });
  return {
    id: insertedId,
  }
};

export {
  insertQuantityInIngredientStockModel,
}
