import CategoryB2C from '../models/Categoryb2c.js';

// Create a new B2C category
export const createCategoryB2C = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ success: false, message: 'Name and image are required' });
    }

    const categoryExists = await CategoryB2C.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ success: false, message: 'B2C category already exists' });
    }

    const category = new CategoryB2C({ name, image });
    await category.save();

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error('Error creating B2C category:', error);
    res.status(500).json({ success: false, message: 'Failed to create B2C category' });
  }
};

// Get all B2C categories
export const getCategoriesB2C = async (req, res) => {
  try {
    const categories = await CategoryB2C.find().sort({ createdAt: -1 });
    console.log('Fetched B2C categories:', categories); // Debug log
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching B2C categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch B2C categories' });
  }
};

// Update B2C category
export const updateCategoryB2C = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const updatedCategory = await CategoryB2C.findByIdAndUpdate(
      id,
      { name, image },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'B2C category not found' });
    }

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error('Error updating B2C category:', error);
    res.status(500).json({ success: false, message: 'Failed to update B2C category' });
  }
};

// Delete B2C category
export const deleteCategoryB2C = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await CategoryB2C.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: 'B2C category not found' });
    }

    res.status(200).json({ success: true, message: 'B2C category deleted successfully' });
  } catch (error) {
    console.error('Error deleting B2C category:', error);
    res.status(500).json({ success: false, message: 'Failed to delete B2C category' });
  }
};