import express from 'express';
import { upload } from '../config/uploadConfig';
import { insertImageRecipeController, insertProductController } from '../controllers/productController';
import authAdminMiddleware from '../middlewares/authAdminMiddleware';

const productRoute = express.Router();

productRoute.post('/image', authAdminMiddleware, upload.single('image'),
  insertImageRecipeController);
productRoute.post('/create', authAdminMiddleware, insertProductController)

export default productRoute;


