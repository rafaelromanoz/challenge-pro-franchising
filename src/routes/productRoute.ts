import express from 'express';
import { upload } from 'src/config/uploadConfig';
import { insertImageRecipeController } from 'src/controllers/productController';
import authAdminMiddleware from '../middlewares/authAdminMiddleware';

const productRoute = express.Router();

productRoute.post('/image', authAdminMiddleware, upload.single('image'),
  insertImageRecipeController);

export default productRoute;


