import CategoryB2C from '../models/categoryb2c.js';


export const createCategoryb2c = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ success: false, message: 'Name and image are required' });
    }

    const categoryExists = await CategoryB2C.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const category = new CategoryB2C({ name, image });
    await category.save();

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
};

// Get all categories
export const getCategoriesb2c = async (req, res) => {
  try {
    const categories = await CategoryB2C.find().sort({ createdAt: -1 });
    console.log('Fetched categories:', categories); // Debug log
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

// Update category
export const updateCategoryb2c = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const updatedCategory = await CategoryB2C.findByIdAndUpdate(
      id,
      { name, image },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
};

// Delete category
export const deleteCategoryb2c = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await CategoryB2C.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
};