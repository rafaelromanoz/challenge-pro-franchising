import express from 'express';
import { upload } from '../config/uploadConfig';
import {
  getAllProductsController,
  insertImageRecipeController,
  insertProductController,
  verifyProductController
} from '../controllers/productController';
import authAdminMiddleware from '../middlewares/authAdminMiddleware';

const productRoute = express.Router();

productRoute.post('/image', authAdminMiddleware, upload.single('image'),
  insertImageRecipeController);
productRoute.post('/create', authAdminMiddleware, insertProductController);
productRoute.get('/verifyProduct', authAdminMiddleware, verifyProductController);
productRoute.get('/getAllProducts', authAdminMiddleware, getAllProductsController);

export default productRoute;


