import express from 'express';
import { upload } from '../config/uploadConfig';
import {
  deleteProductController,
  getAllProductsController,
  insertImageRecipeController,
  insertProductController,
  updateProductController,
  verifyProductController
} from '../controllers/productController';
import authAdminMiddleware from '../middlewares/authAdminMiddleware';

const productRoute = express.Router();

productRoute.post('/image', authAdminMiddleware, upload.single('image'),
  insertImageRecipeController);
productRoute.post('/create', authAdminMiddleware, insertProductController);
productRoute.get('/verifyProduct', authAdminMiddleware, verifyProductController);
productRoute.get('/getAllProducts', getAllProductsController);
productRoute.delete('/delete', authAdminMiddleware, deleteProductController);
productRoute.put('/update', authAdminMiddleware, updateProductController);

export default productRoute;


