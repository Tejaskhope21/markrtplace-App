import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';

import shopRoutes from './routes/shopRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import itemb2cRoutes from './routes/itemb2cRoutes.js';
import Item from './models/Item.js';
import path from "path";

dotenv.config();

const app = express();

// Enable CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Middleware for JSON and form data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Ensure the 'uploads' directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Routes
app.use('/api/shops', shopRoutes);
app.use('/api/items', itemRoutes); // This handles /api/items and /api/items/:id
app.use('/api', categoryRoutes);
app.use('/api/itemsb2c', itemb2cRoutes);

// Add new item
// app.post('/api/add', upload.array('images', 5), async (req, res) => {
//   try {
//     const { name, category, subcategory, description, price, rating, price_per_piece, MOQ, specifications, supplier, shipping, b2b_menu } = req.body;

//     const imageUrls = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);

//     const newItem = new Item({
//       name,
//       category,
//       subcategory,
//       product_category,
//       description,
//       price,
//       rating,
//       price_per_piece: JSON.parse(price_per_piece),
//       MOQ,
//       specifications: JSON.parse(specifications || '{}'),
//       images: imageUrls,
//       supplier: JSON.parse(supplier),
//       shipping: JSON.parse(shipping),
//       b2b_menu,
//     });

//     const savedItem = await newItem.save();

//     res.status(201).json({ success: true, message: "Item added successfully!", data: savedItem });
//   } catch (error) {
//     console.error("Error saving item:", error);
//     res.status(500).json({ success: false, message: "Error saving item", error: error.message });
//   }
// });

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));