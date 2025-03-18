import express from 'express';
import {
  getMenus,
  getMenuByName,
  createMenu,
  updateMenu,
  deleteMenu,
} from '../controllers/menuController.js';

const router = express.Router();

router.get('/', getMenus);
router.get('/:name', getMenuByName);
router.post('/', createMenu);
router.put('/:name', updateMenu);
router.delete('/:name', deleteMenu);

export default router; // ✅ Use default export here
