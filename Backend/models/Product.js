import mongoose from 'mongoose';
import { uid } from 'uid';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: {
    type: String, // Changed from Number to String to accommodate uid
    required: true,
    unique: true, // Ensure the product ID is unique
    default: () => uid(6), // Generate a 6-character unique ID by default
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
  },
  subcategory: {
    type: String,
    required: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  images: [{
    type: String,
    required: true,
    match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please enter a valid URL'],
  }],
  supplier: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  specifications: {
    material: {
      type: String,
      required: true,
      trim: true,
    },
    height: {
      type: String,
      required: true,
      trim: true,
    },
  },
  shipping: {
    free_shipping_above: {
      type: Number,
      required: true,
      min: 0,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Product = mongoose.model('Product', ProductSchema);
export default Product;