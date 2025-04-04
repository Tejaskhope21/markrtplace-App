import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


import itemRoutes from "./routes/itemRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import itemb2cRoutes from "./routes/itemb2cRoutes.js";
import categoryb2cRoutes from "./routes/categoryb2cRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes

app.use("/api/items", itemRoutes); // Multer is now applied in itemRoutes.js for the specific route
app.use("/api", categoryRoutes);
app.use("/api", categoryb2cRoutes);
app.use("/api/itemsb2c", itemb2cRoutes);
// app.use("/api/user", userRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});