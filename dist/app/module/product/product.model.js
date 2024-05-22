"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
// varinats schme
const variantsSchema = new mongoose_1.Schema({
    type: String,
    value: String
});
// inventory schema
const inventorySchema = new mongoose_1.Schema({
    quantity: Number,
    inStock: Boolean
});
// Main Schema - Product Schema
const productSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    tags: [String],
    variants: [variantsSchema],
    inventory: inventorySchema
});
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
