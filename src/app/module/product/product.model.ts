import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariants } from "./product.interface";

// varinats schme
const variantsSchema = new Schema<TVariants>({
    type: String,
    value: String
})

// inventory schema
const inventorySchema = new Schema<TInventory>({
    quantity: Number,
    inStock: Boolean
})

// Main Schema - Product Schema
const productSchema = new Schema<TProduct>({
    name: String,
    description: String,
    price: Number,
    category: String,
    tags:[String],
    variants: [variantsSchema],
    inventory: inventorySchema
})

export const ProductModel = model<TProduct>('Product', productSchema);