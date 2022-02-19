import connection from "./connection";

interface IProduct {
  name: string;
  price: number;
  ingredients: Array<object>;
}

const createProductModel = async (product: IProduct) => {
  const instanceDB = await connection();
  const { insertedId } = await instanceDB
    .collection("products")
    .insertOne({ ...product });
  return {
    id: insertedId,
  };
};

const insertNameImageModel = async (name: string, image: string) => {
  const instanceDB = await connection();
  await instanceDB.collection("products").updateOne(
    { name },
    {
      $set: {
        image,
      },
    }
  );
};

const findProductByNameModel = async (productName: string) => {
  const instanceDB = await connection();
  const foundProduct = await instanceDB
    .collection("products")
    .findOne({ name: productName });
  return foundProduct;
};

const getAllProductsIngredientsAndStock = async () => {
  const instanceDB = await connection();
  const allProducts = await instanceDB
    .collection("products")
    .aggregate([
      {
        $lookup: {
          from: "ingredients",
          localField: "ingredients.name",
          foreignField: "name",
          as: "ingredients",
        },
      },
      {
        $lookup: {
          from: "stockIngredient",
          localField: "ingredients.name",
          foreignField: "name",
          as: "stock_ingredient",
        },
      },
      {
        $project: {
          _id: 0,
          "ingredients._id": 0,
          "stock_ingredient._id": 0,
        },
      },
      {
        $addFields: {
          totalPrice: {
            $sum: "$ingredients.unitPrice"
          }
        }
      }
    ]).toArray();
  return allProducts;
};

// const ingredientFound = await instanceDB.collection('ingredients').aggregate([
//   {
//     $lookup: {
//       from: "stockIngredient",
//       localField: "name",
//       foreignField: "name",
//       as: "stock_ingredients"
//     }
//     },
//     {
//       $project: {
//         _id: 0,
//       }
//     }, {
//       $addFields: {
//         totalPrice: {
//           $add: ["$unitPrice", "$unitPrice"]
//         }
//       }
//     }
//   ]).toArray();

export {
  createProductModel,
  findProductByNameModel,
  insertNameImageModel,
  getAllProductsIngredientsAndStock,
};
