import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema, {
  productUpdateValidationSchema,
} from './product.validator';

// create product controller
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

// get All products controller and get search products controller
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchQueryValue = req.query.searchTerm;
    if (searchQueryValue) {
      // get search products
      const result = await ProductServices.searchProductsFromDB(
        searchQueryValue as string,
      );

      res.status(200).json({
        success: true,
        message: 'Products from search retrieved successfully',
        data: result,
      });
    } else {
      // get all products
      const result = await ProductServices.getAllProductsFromDB();

      res.status(200).json({
        success: true,
        message: 'All Products retrieved successfully',
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

// get Single product controller
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getSingleProductFromDB(
      req.params.productId,
    );

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// update Single product controller
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const updateProduct = req.body;
    const updateProductValue =
      productUpdateValidationSchema.parse(updateProduct);
    const result = await ProductServices.updateSingleProductInDB(
      req.params.productId,
      updateProductValue,
    );

    res.status(200).json({
      success: true,
      message: 'Product Updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// delete Single product controller
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    await ProductServices.deleteSingleProductFromDB(req.params.productId);

    res.status(200).json({
      success: true,
      message: 'Product Deleted successfully',
      data: null,
    });
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
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
