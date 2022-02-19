import connection from "./connection";

interface IProduct {
  name: string;
  price: number;
  ingredients: Array<object>;
}

const createProductModel = async (product: IProduct) => {
  const instanceDB = await connection();
  const { insertedId } = await instanceDB.collection('products').insertOne({ ...product });
  return {
    id: insertedId,
  }
};

const insertNameImageModel = async (name: string, image: string) => {
  const instanceDB = await connection();
  await instanceDB.collection('products').updateOne({ name }, {
    $set: {
      image,
    }
  })
}

const findProductByNameModel = async (productName: string) => {
  const instanceDB = await connection();
  const foundProduct = await instanceDB.collection('products').findOne({ name: productName });
  return foundProduct;
}

const getAllProductsIngredientsAndStock = async () => {
  const instanceDB = await connection();
  const ingredientsFound = await instanceDB.collection('products').aggregate([
    {
      $lookup: {
        from: "stockIngredient",
        localField: "name",
        foreignField: "name",
        as: "quantity_ingredients"
      }
    }
  ])
  return ingredientsFound;
};

export {
  createProductModel,
  findProductByNameModel,
  insertNameImageModel,
  getAllProductsIngredientsAndStock,
}
