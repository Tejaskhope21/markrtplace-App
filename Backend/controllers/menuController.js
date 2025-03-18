import Menu from '../models/Menu.js';

// Get all menus
export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get menu by name
export const getMenuByName = async (req, res) => {
  try {
    const menu = await Menu.findOne({ menu_item: req.params.name });
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new menu
export const createMenu = async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update menu
export const updateMenu = async (req, res) => {
  try {
    const updatedMenu = await Menu.findOneAndUpdate(
      { menu_item: req.params.name },
      req.body,
      { new: true }
    );
    if (!updatedMenu) return res.status(404).json({ message: 'Menu not found' });
    res.json(updatedMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete menu
export const deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await Menu.findOneAndDelete({ menu_item: req.params.name });
    if (!deletedMenu) return res.status(404).json({ message: 'Menu not found' });
    res.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

