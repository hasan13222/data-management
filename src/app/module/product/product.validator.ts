import { z } from 'zod';

// varinats schema validator
const variantsSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// inventory schema validator
const inventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

// Main Schema - Product Schema validator
const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.string().array(),
  variants: z.array(variantsSchema),
  inventory: inventorySchema,
});

export default productValidationSchema;

// update Schema

// varinats schema update validator
const variantsUpdateSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// inventory schema update validator
const inventoryUpdateSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

// Main Schema - Product Schema update validator
export const productUpdateValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  tags: z.string().array().optional(),
  variants: z.array(variantsUpdateSchema).optional(),
  inventory: inventoryUpdateSchema.optional(),
});
