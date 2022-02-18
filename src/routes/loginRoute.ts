import express from 'express';

import { loginController } from '../controllers/loginController';

const loginRoute = express.Router();

loginRoute.post('/', loginController);

export default loginRoute;
