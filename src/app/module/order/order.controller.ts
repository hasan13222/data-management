import { Request, Response } from 'express';
import orderValidationSchema from './order.validator';
import { OrderServices } from './order.service';

// create a new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const newOrderValue = orderValidationSchema.parse(newOrder);

    const result = await OrderServices.createOrderIntoDB(newOrderValue);
    if (!result) {
      res.status(500).json({
        success: true,
        message: 'Order not found',
      });
    } else if (result === 'stock out') {
      res.status(500).json({
        success: true,
        message: 'Insufficient quantity available in inventory',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order created successfully',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const queryValue = req.query.email;
    if (queryValue) {
      const result = await OrderServices.getOrdersByEmailFromDB(
        queryValue as string,
      );

      res.status(200).json({
        success: true,
        message: 'Orders retrieved by email successfully',
        data: result,
      });
    } else {
      const result = await OrderServices.getAllOrdersFromDB();

      res.status(200).json({
        success: true,
        message: 'All orders retrieved successfully',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
