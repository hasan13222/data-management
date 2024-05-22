import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProdcutRoutes } from './app/module/product/product.route';
const app: Application = express();

// json parser
app.use(express.json());
// cors middleware
app.use(cors());

// endpoints
app.use('/api/products', ProdcutRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the data management application');
});

export default app;
