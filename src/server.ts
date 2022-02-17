import express from 'express';
import errorHandler from './middlewares/errorHandler';
import ingredientRoute from './routes/ingredientRoute';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors());

app.use('/ingredient', ingredientRoute);

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
