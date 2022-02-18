import express from 'express';
import authAdminMiddleware from '../middlewares/authAdminMiddleware';
import { registerOwnerController } from '../controllers/usersController';

const userRouter = express.Router();

userRouter.post('/owner',authAdminMiddleware, registerOwnerController);

export default userRouter;
