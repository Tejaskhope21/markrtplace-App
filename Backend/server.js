import express from 'express';
import cors from 'cors';

import connectDB from './config/connect_db.js';

import 'dotenv/config'

const menuRoutes = require('./routes/menuRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middlewar
app.use(express.json());
app.use(cors());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Sample route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Routes
app.use('/api/menus', menuRoutes);
app.use('/api/items', itemRoutes);

// Start server
const PORT = 5000 || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});