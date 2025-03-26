import express from "express";
import multer from "multer";
import fs from "fs";
import { addItem ,getItem,getallItems} from "../controllers/itemController.js";
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
router.get("/:id",getItem );
// Route to add a new item with file uploads
router.post("/add", upload.array("images", 5),addItem);

// Route to fetch items (with category filter)
router.get("/", getallItems);

export default router;
