import express from 'express';
import { getItems, getItemById, item_add, updateItem, deleteItem } from '../controllers/itemController.js';
import upload from '../middleware/uplode.js'; 

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', upload.single('image'), item_add); // Change '/add' to '/'
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;