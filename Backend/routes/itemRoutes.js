import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// ✅ Route to get all items or filter by category
router.get('/', async (req, res) => {
  try {
    const { category, ids } = req.query;

    if (category) {
      if (!category) {
        return res.status(400).json({ success: false, message: 'Category is required' });
      }

      const items = await Item.find({ category: category }).exec();

      if (!items || items.length === 0) {
        return res.status(404).json({ success: false, message: 'No items found for this category' });
      }

      res.status(200).json(items);
    } else if (ids) {
      const itemIds = ids.split(',').map(id => id.trim());
      if (!itemIds.length) {
        return res.status(400).json({ success: false, message: 'No item IDs provided' });
      }

      const items = await Item.find({ _id: { $in: itemIds } }).exec();

      if (!items || items.length === 0) {
        return res.status(404).json({ success: false, message: 'No items found for the provided IDs' });
      }

      res.status(200).json(items);
    } else {
      return res.status(400).json({ success: false, message: 'Category or IDs must be provided' });
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch items', error: error.message });
  }
});

// Fetch a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Item ID is required' });
    }

    const item = await Item.findById(id).exec();

    if (!item) {
      return res.status(404).json({ success: false, message: `No item found with ID: ${id}` });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch item', error: error.message });
  }
});

export default router;
