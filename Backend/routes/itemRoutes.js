import express from "express";
import multer from "multer";
import fs from "fs";
import { addItem ,getItem,removeitem,updateItem,getallItems,getItems} from "../controllers/itemController.js";
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
router.get("/:id",getItems)
router.get("/", getallItems);
router.get("/item",getItem );
router.post("/add", upload.array("images", 5),addItem);
router.delete("/remove/:id", removeitem);
router.put("/update/:id",upload.array("images", 5),updateItem);

export default router;
