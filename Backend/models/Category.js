import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure category names are unique
      trim: true,
    },
    image: {
      type: String,
      required: true, // URL for category image
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set creation date
    },
  },
  { timestamps: true } // Add createdAt and updatedAt automatically
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
