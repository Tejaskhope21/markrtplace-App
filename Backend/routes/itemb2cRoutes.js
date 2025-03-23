import express from 'express';
import {
  createItemB2C,
  getAllItemsB2C,
  getItemB2CById,
  updateItemB2C,
  deleteItemB2C,
  getFeaturedItemsB2C,
} from '../controllers/itemsb2cController.js';

const router = express.Router();

router.post('/itemsb2c/add', createItemB2C);
router.get('/itemsb2c', getAllItemsB2C);
router.get('/itemsb2c/:id', getItemB2CById);
router.put('/itemsb2c/:id', updateItemB2C);
router.delete('/itemsb2c/:id', deleteItemB2C);
router.get('/itemsb2c/featured', getFeaturedItemsB2C);

export default router;