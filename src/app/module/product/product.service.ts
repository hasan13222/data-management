import mongoose from "mongoose";
import { TProduct, TUpdateProduct } from "./product.interface";
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

// update a single product by id pararams
const updateSingleProductInDB = async (id: string, updatedDoc: TUpdateProduct) => {
    const MObjectId = mongoose.Types.ObjectId;
    const result = await ProductModel.findOneAndUpdate({_id: new MObjectId(id)}, {$set: updatedDoc}, {returnDocument: "after"});
    return result;
}

// delete a single product by id pararams
const deleteSingleProductFromDB = async (id: string) => {
    const MObjectId = mongoose.Types.ObjectId;
    const result = await ProductModel.deleteOne({_id: new MObjectId(id)});
    return result;
}


// delete a single product by id pararams
const searchProductsFromDB = async (queryValue: string) => {
    const result = await ProductModel.find({$or: [{name: new RegExp(queryValue, 'i')}, {tags: queryValue}]});
    return result;
}

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductInDB,
    deleteSingleProductFromDB,
    searchProductsFromDB
}