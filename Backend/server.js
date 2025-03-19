// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import itemRoutes from './routes/itemRoutes.js';
// // import menuRoutes from './routes/menuRoutes.js';

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware for parsing JSON
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO)
//   .then(() => console.log(' MongoDB connected'))
//   .catch(err => console.error(' MongoDB connection error:', err));

// // Routes
// app.use('/api/items', itemRoutes);
// // app.use('/api/menus', menuRoutes);
// app.get('/', (req, res) => {
//   res.send('API is running...');
// }
// );

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(` Server running on port ${PORT}`));





import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes.js';
import multer from 'multer'; // Import multer

dotenv.config();

const app = express();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

app.use(express.json());

mongoose.connect(process.env.MONGO)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/items', itemRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
}
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Ensure the 'uploads' directory exists
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}