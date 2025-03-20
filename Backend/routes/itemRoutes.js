import express from 'express';
import multer from 'multer';
import { addItem, getItems } from '../controllers/itemController.js';

const router = express.Router();

<<<<<<< HEAD
// ✅ Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store uploaded images in `uploads/`
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
=======
// router.get('/', getItems);
// router.get('/:id', getItemById);
router.post('/add', upload.single('image'), item_add); // Change '/add' to '/'
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);
>>>>>>> 97c5ff45b22cc05aa6f15e46e789fbdb9223baf7

const upload = multer({ storage });

router.post('/add', upload.array('images', 5), addItem);
router.get('/', getItems);

export default router;
