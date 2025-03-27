import express from "express";
import {
  createItemB2C,
  getAllItemsB2C,
  getItemB2CById,
  updateItemB2C,
  deleteItemB2C,
  getFeaturedItemsB2C,
} from "../controllers/itemsb2cController.js";

const router = express.Router();

// Routes (without multer, since we're using image URLs)
router.post("/addbtoc", createItemB2C);
router.get("/", getAllItemsB2C);
router.get("/:id", getItemB2CById);
router.put("/:id", updateItemB2C); // Assuming updateItemB2C also uses image URLs
router.delete("/:id", deleteItemB2C);
router.get("/featured", getFeaturedItemsB2C);

export default router;