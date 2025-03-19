import express from 'express';
import { getItems, getItemById, item_add, updateItem, deleteItem } from '../controllers/itemController.js';
import upload from '../middleware/upload'; // Assuming you'll create this middleware

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/add', upload.single('image'), item_add); // Handle single image upload
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;