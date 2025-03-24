import express from 'express';
import {
  createCategoryB2C,
  getCategoriesB2C,
  updateCategoryB2C,
  deleteCategoryB2C,
} from '../controllers/categoryb2cController.js';

const router = express.Router();

// Routes for B2C categories
router.post('/categoriesb2c', createCategoryB2C); // Create a new B2C category
router.get('/categoriesb2c', getCategoriesB2C); // Get all B2C categories
router.put('/categoriesb2c/:id', updateCategoryB2C); // Update a B2C category
router.delete('/categoriesb2c/:id', deleteCategoryB2C); // Delete a B2C category

export default router;