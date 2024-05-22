import {z} from 'zod'


// varinats schema validator
const variantsSchema = z.object({
    type: z.string(),
    value: z.string()
})

// inventory schema validator
const inventorySchema = z.object({
    quantity: z.number(),
    inStock: z.boolean()
})

// Main Schema - Product Schema validator
const productValidationSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    tags:z.string().array(),
    variants: z.array(variantsSchema),
    inventory: inventorySchema
})

export default productValidationSchema;