import express from 'express';
import authAdminMiddleware from '../middlewares/authAdminMiddleware';
import { registerOwnerController, registerShopkeeperController } from '../controllers/usersController';

const userRouter = express.Router();

userRouter.post('/owner', authAdminMiddleware, registerOwnerController);
userRouter.post('/shopkeeper',authAdminMiddleware, registerShopkeeperController);

export default userRouter;
