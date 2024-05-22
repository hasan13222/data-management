"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdateValidationSchema = void 0;
const zod_1 = require("zod");
// varinats schema validator
const variantsSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string()
});
// inventory schema validator
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean()
});
// Main Schema - Product Schema validator
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    category: zod_1.z.string(),
    tags: zod_1.z.string().array(),
    variants: zod_1.z.array(variantsSchema),
    inventory: inventorySchema
});
exports.default = productValidationSchema;
// update Schema
// varinats schema update validator
const variantsUpdateSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string()
});
// inventory schema update validator
const inventoryUpdateSchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean()
});
// Main Schema - Product Schema update validator
exports.productUpdateValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    category: zod_1.z.string().optional(),
    tags: zod_1.z.string().array().optional(),
    variants: zod_1.z.array(variantsUpdateSchema).optional(),
    inventory: inventoryUpdateSchema.optional()
});
