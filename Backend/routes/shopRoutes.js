import express from 'express';
import { registerShop, getShops } from '../controllers/shopController.js';

const router = express.Router();

router.post('/register', registerShop); // ✅ Register shop
router.get('/', getShops); // ✅ Get all shops

export default router;
