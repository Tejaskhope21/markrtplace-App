import Product from '../models/Product.js';

// Create a new product
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData); // id is auto-generated
    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product created successfully', data: savedProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: 'Products retrieved successfully', data: products });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }); // id is now a String
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product retrieved successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Get featured products
const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.status(200).json({ message: 'Featured products retrieved successfully', data: featuredProducts });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving featured products', error: error.message });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
};