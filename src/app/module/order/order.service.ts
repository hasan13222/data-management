import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

// create order
const createOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

// get all orders
const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};


// get all orders by email
const getOrdersByEmailFromDB = async (filterEmail: string) => {
  const result = await OrderModel.find({email: filterEmail});
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB
};
