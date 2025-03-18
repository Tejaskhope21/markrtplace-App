

import express from 'express';
import cors from 'cors';

import connectDB from './config/connect_db.js';

import 'dotenv/config'

const app = express();

// Middlewar
app.use(express.json());
app.use(cors());

// MongoDB Connection
connectDB();

// Sample route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
const PORT = 5000 || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});