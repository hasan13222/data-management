import mongoose from 'mongoose';
import { ProductModel } from '../product/product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

// create order
const createOrderIntoDB = async (order: TOrder) => {
  const MObjectId = mongoose.Types.ObjectId;
  // finding product from product database
  const productToOrder = await ProductModel.findOne({
    _id: new MObjectId(order.productId),
  });
  if(!productToOrder){
    return false;
  }

  // checking qty
  const inventoryQty = productToOrder?.inventory?.quantity;
  const remainingQty = inventoryQty - order.quantity;

  if (remainingQty < 0) {
    return "stock out";
  } else if ((remainingQty === 0)) {
    await ProductModel.updateOne({ _id: new MObjectId(order.productId)}, {$set: {inventory: {quantity: remainingQty, inStock: false}}})

    const result = await OrderModel.create(order);
    return result;
  } else {
    await ProductModel.updateOne({ _id: new MObjectId(order.productId)}, {$set: {inventory: {quantity: remainingQty, inStock: true}}})
    const result = await OrderModel.create(order);
    return result;
  }
};

// get all orders
const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

// get all orders by email
const getOrdersByEmailFromDB = async (filterEmail: string) => {
  const result = await OrderModel.find({ email: filterEmail });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};
