import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());

// MongoDB Connection
<<<<<<< HEAD
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};
=======
connectDB();
>>>>>>> 87e3bc262baa3688377a1a08d886a2fa2baf2305

// Sample route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/menus', menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
