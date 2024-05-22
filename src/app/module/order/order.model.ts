import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: String,
  productId: String,
  price: Number,
  quantity: Number,
});

export const OrderModel = model<TOrder>('Order', orderSchema);
