import express from "express";
import multer from "multer";
import fs from "fs";
import { 
  addItemB2C, 
  getItemB2C, 
  getAllItemsB2C, 
  updateItemB2C, 
  deleteItemB2C 
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
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ✅ Fetch a single B2C item
router.get("/:id", getItemB2C);

// ✅ Add a new B2C item with image uploads (max 5 images)
router.post("/add", upload.array("images", 5), addItemB2C);

// ✅ Fetch all B2C items (with optional category filter)
router.get("/", getAllItemsB2C);

// ✅ Update a B2C item
router.put("/:id", upload.array("images", 5), updateItemB2C);

// ✅ Delete a B2C item
router.delete("/:id", deleteItemB2C);

export default router;
