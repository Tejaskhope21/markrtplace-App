import Item from '../models/Item.js';

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ id: req.params.id });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new item with image upload
export const item_add = async (req, res) => {
  const image_filename = req.file ? `${req.file.filename}` : '';

  // Map form data to Item schema
  const newItem = new Item({
    id: req.body.id,
    name: req.body.name,
    category: req.body.category, // General category
    product_category: req.body.product_category,
    price_per_piece: {
      '20-199': Number(req.body['price_per_piece[20-199]']) || 0,
      '200-999': Number(req.body['price_per_piece[200-999]']) || 0,
      '1000+': Number(req.body['price_per_piece[1000+]']) || 0
    },
    MOQ: Number(req.body.MOQ) || 0,
    specifications: req.body.specifications || {},
    images: image_filename ? [image_filename] : [], // Store uploaded image
    supplier: {
      name: req.body.supplier_name || '',
      location: req.body.supplier_location || ''
    },
    shipping: {
      free_shipping_above: Number(req.body.free_shipping_above) || 0,
      cost: Number(req.body.shipping_cost) || 0
    },
    b2b_menu: {
      menu_item: req.body.b2b_menu || null, // From the category dropdown
      menu_img: req.body.b2b_menu_img || null // Optional image for B2B menu
    }
  });

  try {
    await newItem.save();
    res.json({ success: true, message: 'Item Added' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update an item
export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an item
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({ id: req.params.id });
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};