import mongoose from 'mongoose';

const Productadmin = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    unique: true, // Ensure mobile number is unique
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
  },
  otp: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6, // OTP should be exactly 6 digits
  },
  category: {
    type: String,
    required: true,
    enum: ['B2B', 'B2C'], // Only allow specific values
  },
  shopName: {
    type: String,
    required: true,
    trim: true,
  },
  businessType: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode'],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-generate creation date
  },
});

const ListProduct = mongoose.model('ListProduct', Productadmin);

export default ListProduct;
