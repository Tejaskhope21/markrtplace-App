import mongoose from 'mongoose';

const categoryB2CSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategoryB2C = mongoose.model('CategoryB2C', categoryB2CSchema);
export default CategoryB2C;