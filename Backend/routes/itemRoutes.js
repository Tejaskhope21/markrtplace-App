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
router.get("/item",getItem );
router.get("/", getallItems);
router.get("/:id",getItems)
router.post("/add", upload.array("images", 5),addItem);
router.delete("/remove/:id", removeitem);
router.put("/update/:id",upload.array("images", 5),updateItem);
// router.put("/update/:id", updateItem);
router.put("/update/:id", upload.array('images'), async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedFields = {
      name: body.name,
      category: body.category,
      product_category: body.product_category,
      description: body.description,
      MOQ: body.MOQ,
      b2b_menu: body.b2b_menu,
      price_per_piece: JSON.parse(body.price_per_piece),
      specifications: JSON.parse(body.specifications),
      supplier: JSON.parse(body.supplier),
      shipping: JSON.parse(body.shipping),
    };

    if (req.files && req.files.length > 0) {
      updatedFields.images = req.files.map((file) => file.filename);
    }

    await Item.findByIdAndUpdate(id, updatedFields);
    res.json({ success: true, message: 'Item updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update item', error: error.message });
  }
});
export default router;

