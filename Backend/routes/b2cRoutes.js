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
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/featured', getFeaturedProducts);

export default router;