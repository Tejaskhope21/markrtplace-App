// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import multer from 'multer';
// import fs from 'fs';
// import shopeRoutes from './routes/shopRoutes.js'
// import itemRoutes from './routes/itemRoutes.js'; // ✅ Import item 
// import categoryRoutes from './routes/categoryRoutes.js';
// import productRoutes from "./routes/b2cRoutes.js";

// import cors from 'cors';


// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));

// // ✅ Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // ✅ Middleware for parsing JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // ✅ For form data


// // ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGO)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // ✅ Routes

// app.use('/api/shops' , shopeRoutes);
// app.use('/api/items', itemRoutes); // ✅ Register item routes
// app.use('/api', categoryRoutes);
// app.use('/api/products', productRoutes);




// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // ✅ Ensure the 'uploads' directory exists
// if (!fs.existsSync('uploads')) {
//   fs.mkdirSync('uploads');
// }

// const PORT = process.env.PORT || 6000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import multer from 'multer';
// import fs from 'fs';
// import shopeRoutes from './routes/shopRoutes.js';
// import itemRoutes from './routes/itemRoutes.js';
// import categoryRoutes from './routes/categoryRoutes.js';
// import productRoutes from './routes/b2cRoutes.js';
// import cors from 'cors';

// dotenv.config();

// const app = express();

// // Enable CORS for the frontend origin
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from the frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // Middleware for parsing JSON and form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/shops', shopeRoutes);
// app.use('/api/items', itemRoutes);
// app.use('/api', categoryRoutes);
// app.use('/api/products', productRoutes);

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Ensure the 'uploads' directory exists
// if (!fs.existsSync('uploads')) {
//   fs.mkdirSync('uploads');
// }

// const PORT = process.env.PORT || 5000; // Change the port to 5000 to match the frontend request
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import shopeRoutes from './routes/shopRoutes.js';
import itemsRoutes from './routes/itemRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/b2cRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Enable CORS for the frontend origin
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cache-Control");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Routes
app.use('/api/shops', shopeRoutes);
app.use('/api', categoryRoutes);
import Item from './models/Item.js'; // Ensure you have a Mongoose model

app.post("/api/add", async (req, res) => {
  try {
    const newItem = new Item(req.body); // Create a new item instance
    const savedItem = await newItem.save(); // Save item to MongoDB

    res.status(201).json({ success: true, message: "Item added successfully!", data: savedItem });
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ success: false, message: "Error saving item", error });
  }
});

app.use('/api/products', productRoutes);



app.get('/', (req, res) => {
  res.send('API is running...');
});

// Ensure the 'uploads' directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const PORT = process.env.PORT || 5000; // Change the port to 5000 to match the frontend request
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));