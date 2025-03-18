// controllers/itemController.js
const { item_list } = require('../../Frontend/src/assets/data'); // Import data

// Get all items
const getItems = (req, res) => {
  res.json(item_list);
};

// Get item by ID
const getItemById = (req, res) => {
  const { id } = req.params;
  const item = item_list.find(i => i.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(item);
};

// Create a new item
const createItem = (req, res) => {
  const {
    id,
    name,
    category,
    product_category,
    price_per_piece,
    MOQ,
    specifications,
    images,
    supplier,
    shipping
  } = req.body;

  if (!id || !name || !category || !product_category || !price_per_piece || !MOQ || !supplier || !shipping) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newItem = {
    id,
    name,
    category,
    product_category,
    price_per_piece,
    MOQ,
    specifications,
    images,
    supplier,
    shipping
  };

  item_list.push(newItem);
  res.status(201).json(newItem);
};

// Update an item
const updateItem = (req, res) => {
  const { id } = req.params;
  const item = item_list.find(i => i.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  const {
    name,
    category,
    product_category,
    price_per_piece,
    MOQ,
    specifications,
    images,
    supplier,
    shipping
  } = req.body;

  if (name) item.name = name;
  if (category) item.category = category;
  if (product_category) item.product_category = product_category;
  if (price_per_piece) item.price_per_piece = price_per_piece;
  if (MOQ) item.MOQ = MOQ;
  if (specifications) item.specifications = specifications;
  if (images) item.images = images;
  if (supplier) item.supplier = supplier;
  if (shipping) item.shipping = shipping;

  res.json(item);
};

// Delete an item
const deleteItem = (req, res) => {
  const { id } = req.params;
  const index = item_list.findIndex(i => i.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  item_list.splice(index, 1);
  res.json({ message: "Item deleted successfully" });
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};

