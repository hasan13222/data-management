import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ProdcutRoutes } from './app/module/product/product.route';
import { OrderRoutes } from './app/module/order/order.route';
const app: Application = express();

// json parser
app.use(express.json());
// cors middleware
app.use(cors());

// endpoints
// products
app.use('/api/products', ProdcutRoutes);
// orders
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Welcome to the data management application');
  } catch (error: any) {
    next(error);
  }
});

// not found route handler
app.all('*', (req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: 'Route not found',
  });
});

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).send({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  } else {
    next();
  }
});

export default app;
