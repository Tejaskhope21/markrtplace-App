import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/categories', getCategories); // Updated route
router.post('/create', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;