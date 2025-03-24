import express from "express";
import Item from "../models/Item.js";
import multer from "multer";
import fs from "fs";

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

// ✅ Route to get all items or filter by category
router.get("/", async (req, res) => {
  try {
    const { category, ids } = req.query;

    if (category) {
      const items = await Item.find({ category: category }).exec();
      if (!items || items.length === 0) {
        return res.status(404).json({ success: false, message: "No items found for this category" });
      }
      res.status(200).json(items);
    } else if (ids) {
      const itemIds = ids.split(",").map((id) => id.trim());
      if (!itemIds.length) {
        return res.status(400).json({ success: false, message: "No item IDs provided" });
      }
      const items = await Item.find({ _id: { $in: itemIds } }).exec();
      if (!items || items.length === 0) {
        return res.status(404).json({ success: false, message: "No items found for the provided IDs" });
      }
      res.status(200).json(items);
    } else {
      return res.status(400).json({ success: false, message: "Category or IDs must be provided" });
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ success: false, message: "Failed to fetch items", error: error.message });
  }
});

// Route to add a new item with file uploads
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      description,
      price,
      rating,
      MOQ,
      b2b_menu,
    } = req.body;

    // Construct nested objects from form-data
    const price_per_piece = {
      "20-199": parseFloat(req.body["price_per_piece[20-199]"]),
      "200-999": parseFloat(req.body["price_per_piece[200-999]"]),
      "1000+": parseFloat(req.body["price_per_piece[1000+]"]),
    };

    const specifications = {
      color: req.body["specifications[color]"] || "",
      weight: req.body["specifications[weight]"] || "",
      battery: req.body["specifications[battery]"] || "",
    };

    const supplier = {
      name: req.body["supplier[name]"],
      location: req.body["supplier[location]"],
    };

    const shipping = {
      free_shipping_above: parseFloat(req.body["shipping[free_shipping_above]"] || 0),
      cost: parseFloat(req.body["shipping[cost]"]),
    };

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    const imageUrls = req.files.map((file) => `http://localhost:5000/uploads/${file.filename}`);

    const newItem = new Item({
      name,
      category,
      subcategory,
      description,
      price,
      rating,
      price_per_piece,
      MOQ,
      specifications,
      images: imageUrls,
      supplier,
      shipping,
      b2b_menu,
    });

    const savedItem = await newItem.save();

    res.status(201).json({ success: true, message: "Item added successfully!", data: savedItem });
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ success: false, message: "Error saving item", error: error.message });
  }
});

// Fetch a single item by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const item = await Item.findById(id).exec();

    if (!item) {
      return res.status(404).json({ success: false, message: `No item found with ID: ${id}` });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ success: false, message: "Failed to fetch item", error: error.message });
  }
});

export default router;