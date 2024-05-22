import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

// create new product service
const createProductIntoDB = async (product: TProduct) => {
    const result = await ProductModel.create(product);
    return result;
}

// get all products service
const getAllProductsFromDB = async () => {
    const result = await ProductModel.find();
    return result;
}

// get single porduct by id
const getSingleProductFromDB = async (id: string) => {
    const MObjectId = mongoose.Types.ObjectId;
    const result = await ProductModel.findOne({_id: new MObjectId(id)});
    return result;
}

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB
}