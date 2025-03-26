

import express from 'express';
import {
  createCategoryb2c,
  getCategoriesb2c,
  updateCategoryb2c,
  deleteCategoryb2c,
} from '../controllers/categoriesController.js';

const router = express.Router();


router.get('/categoriesb2c', getCategoriesb2c); // Updated route

router.post('/createb2c', createCategoryb2c);
router.put('/:id', updateCategoryb2c);
router.delete('/:id', deleteCategoryb2c);

export default router;