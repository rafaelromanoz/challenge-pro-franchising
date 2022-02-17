import express from 'express';
import errorHandler from './middlewares/errorHandler';
const app = express();
const port = 3000;




app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
