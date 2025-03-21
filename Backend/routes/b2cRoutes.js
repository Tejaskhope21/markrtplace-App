import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.post('/productsadd', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById); // :id is now a string
router.put('/products/:id', updateProduct); // :id is now a string
router.delete('/products/:id', deleteProduct); // :id is now a string
router.get('/products/featured', getFeaturedProducts);

export default router;