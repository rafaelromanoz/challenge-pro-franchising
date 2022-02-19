import connection from "./connection";

interface IStock {
  name: string,
  quantity: number,
}

const updateQuantityStockModel = async (stock: IStock) => {
  const { name, quantity } = stock;
  const instanceDB = await connection();
  const { insertedId } = await instanceDB.collection('stockIngredient')
    .updateOne(
      { name },
      {
        $set: { name, quantity }
      },
      { upsert: true }
    );
  return {
    id: insertedId,
  }
};



export {
  updateQuantityStockModel,
}
