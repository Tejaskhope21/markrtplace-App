import Product from '../models/Product.js';

// Create a new product
const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // No need to check for existing ID since it's auto-generated
    const product = new Product(productData); // id will be set automatically by the schema
    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product created successfully', data: savedProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

// Rest of the controller remains mostly unchanged, but adjust id references to String
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

// Similarly update updateProduct and deleteProduct
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id }, // id is now a String
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

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.params.id }); // id is now a String
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Export (unchanged)
export {
  createProduct,
  getAllProducts, // No change needed
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts, // No change needed
};