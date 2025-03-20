import express from 'express';
import multer from 'multer';
import { addItem, getItems } from '../controllers/itemController.js';

const router = express.Router();

// ✅ Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store uploaded images in `uploads/`
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/add', upload.array('images', 5), addItem);
router.get('/', getItems);

export default router;
