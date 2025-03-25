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

// Route to add a new item with file uploads
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    // Log all received data for debugging
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);
    console.log("All req.body keys:", Object.keys(req.body));

    const {
      name,
      category,
      product_category,
      description,
      MOQ,
      b2b_menu,
      "price_per_piece[20-199]": price20_199,
      "price_per_piece[200-999]": price200_999,
      "price_per_piece[1000+]": price1000plus,
      "specifications[color]": specColor,
      "specifications[weight]": specWeight,
      "specifications[battery]": specBattery,
      "supplier[name]": supplierName,
      "supplier[location]": supplierLocation,
      "shipping[free_shipping_above]": shippingFreeAbove,
      "shipping[cost]": shippingCost,
    } = req.body;

    // Construct nested objects
    const price_per_piece = {
      "20-199": Number(price20_199),
      "200-999": Number(price200_999),
      "1000+": Number(price1000plus),
    };

    const specifications = {
      color: specColor || "",
      weight: specWeight || "",
      battery: specBattery || "",
    };

    const supplier = {
      name: supplierName,
      location: supplierLocation,
    };

    const shipping = {
      free_shipping_above: Number(shippingFreeAbove) || 0,
      cost: Number(shippingCost),
    };

    // Validate required fields
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image file is required" });
    }

    const requiredFields = {
      name,
      category,
      product_category,
      description,
      MOQ,
      b2b_menu,
      supplierName,
      supplierLocation,
      shippingCost,
      price20_199,
      price200_999,
      price1000plus,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        console.log(`Validation failed: ${key} is missing or empty`);
        return res.status(400).json({ success: false, message: `${key} is required` });
      }
    }

    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

    const newItem = new Item({
      name,
      category,
      product_category,
      description,
      price_per_piece,
      MOQ: Number(MOQ),
      specifications,
      images: imageUrls,
      supplier,
      shipping,
      b2b_menu,
    });

    const savedItem = await newItem.save();
    console.log("Item saved successfully:", savedItem);
    res.status(201).json({ success: true, message: "Item added successfully!", data: savedItem });
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ success: false, message: "Error saving item", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const items = category ? await Item.find({ category }) : await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ success: false, message: "Failed to fetch items", error: error.message });
  }
});

export default router;