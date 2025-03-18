// routes/menuRoutes.js
const express = require('express');
const {
  getMenus,
  getMenuByName,
  createMenu,
  updateMenu,
  deleteMenu,
} = require('../B2Bcontrollers/itemController');

const router = express.Router();

router.get('/', getMenus);
router.get('/:name', getMenuByName);
router.post('/', createMenu);
router.put('/:name', updateMenu);
router.delete('/:name', deleteMenu);

module.exports = router;



