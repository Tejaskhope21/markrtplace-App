import Shop from '../models/Shop.js';

// ✅ Register a new shop
export const registerShop = async (req, res) => {
  const { mobileNumber, otp, category, shopName, businessType, pincode } = req.body;

  try {
    // Validate OTP (for demo purposes, use "123456")
    if (otp !== '123456') {
      return res.status(400).json({ message: 'Invalid OTP. Please enter 123456 for this demo.' });
    }

    // Check if the shop is already registered with the same mobile number
    const existingShop = await Shop.findOne({ mobileNumber });
    if (existingShop) {
      return res.status(400).json({ message: 'Shop already registered with this mobile number' });
    }

    // Create new shop
    const newShop = new Shop({
      mobileNumber,
      otp,
      category,
      shopName,
      businessType,
      pincode,
    });

    // Save to database
    await newShop.save();

    res.status(201).json({ message: 'Shop registered successfully', shop: newShop });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Get all shops (optional)
export const getShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch shops', error });
  }
};
