import ItemB2C from '../models/itemb2c.js'; // Renamed Product to ItemB2C

// Create a new B2C item
const createItemB2C = async (req, res) => {
  try {
    const itemB2CData = req.body;
    const itemB2C = new ItemB2C(itemB2CData); // id is auto-generated
    const savedItemB2C = await itemB2C.save();
    res.status(201).json({ message: 'B2C item created successfully', data: savedItemB2C });
  } catch (error) {
    res.status(400).json({ message: 'Error creating B2C item', error: error.message });
  }
};

// Get all B2C items
const getAllItemsB2C = async (req, res) => {
  try {
    const itemsB2C = await ItemB2C.find();
    res.status(200).json({ message: 'B2C items retrieved successfully', data: itemsB2C });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving B2C items', error: error.message });
  }
};

// Get a single B2C item by ID
const getItemB2CById = async (req, res) => {
  try {
    const itemB2C = await ItemB2C.findOne({ id: req.params.id }); // id is now a String
    if (!itemB2C) {
      return res.status(404).json({ message: 'B2C item not found' });
    }
    res.status(200).json({ message: 'B2C item retrieved successfully', data: itemB2C });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving B2C item', error: error.message });
  }
};

// Update a B2C item by ID
const updateItemB2C = async (req, res) => {
  try {
    const updatedItemB2C = await ItemB2C.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItemB2C) {
      return res.status(404).json({ message: 'B2C item not found' });
    }
    res.status(200).json({ message: 'B2C item updated successfully', data: updatedItemB2C });
  } catch (error) {
    res.status(400).json({ message: 'Error updating B2C item', error: error.message });
  }
};

// Delete a B2C item by ID
const deleteItemB2C = async (req, res) => {
  try {
    const deletedItemB2C = await ItemB2C.findOneAndDelete({ id: req.params.id });
    if (!deletedItemB2C) {
      return res.status(404).json({ message: 'B2C item not found' });
    }
    res.status(200).json({ message: 'B2C item deleted successfully', data: deletedItemB2C });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting B2C item', error: error.message });
  }
};

// Get featured B2C items
const getFeaturedItemsB2C = async (req, res) => {
  try {
    const featuredItemsB2C = await ItemB2C.find({ isFeatured: true });
    res.status(200).json({ message: 'Featured B2C items retrieved successfully', data: featuredItemsB2C });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving featured B2C items', error: error.message });
  }
};

export {
  createItemB2C,
  getAllItemsB2C,
  getItemB2CById,
  updateItemB2C,
  deleteItemB2C,
  getFeaturedItemsB2C,
};
