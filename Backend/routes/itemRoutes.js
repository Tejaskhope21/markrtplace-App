import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// ✅ Route to get all items or filter by category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let items;
    if (category) {
      items = await Item.find({
        category: { $regex: new RegExp(category, "i") }, // Case-insensitive search
      });
    } else {
      items = await Item.find();
    }

    if (!items.length) {
      return res.status(404).json({ message: "No items found" });
    }

    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
