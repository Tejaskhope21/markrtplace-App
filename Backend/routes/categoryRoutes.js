import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch categories", error });
  }
});


router.post('/create', createCategory);
router.get('/list', getCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;