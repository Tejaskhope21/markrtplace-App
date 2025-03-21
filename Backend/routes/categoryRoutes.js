import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/create', createCategory);
router.get('/list', getCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;