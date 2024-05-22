import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validator';

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;
    // validation
    const newProductValue = productValidationSchema.safeParse(newProduct);

    if (!newProductValue.success) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: newProductValue.error.issues,
      });
    } else {
      const result = await ProductServices.createProductIntoDB(
        newProductValue.data,
      );
      res.status(200).json({
        success: true,
        message: 'New Product added successfully',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
};
