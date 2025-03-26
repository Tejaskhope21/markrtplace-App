import express from "express";
import multer from "multer";
import fs from "fs";
import {
  createItemB2C,
  getAllItemsB2C,
  getItemB2CById,
  updateItemB2C,
  deleteItemB2C,
  getFeaturedItemsB2C,
} from "../controllers/itemsb2cController.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  }
});

// Routes
router.post("/add", upload.array("images", 5), createItemB2C); // Add item with image upload
router.get("/", getAllItemsB2C); // Fetch all items
router.get("/:id", getItemB2CById); // Fetch item by ID
router.put("/:id", upload.array("images", 5), updateItemB2C); // Update item with optional image upload
router.delete("/:id", deleteItemB2C); // Delete item
router.get("/featured", getFeaturedItemsB2C); // Fetch featured items

export default router;