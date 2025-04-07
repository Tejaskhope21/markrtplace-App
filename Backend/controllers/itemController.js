import { exec } from "child_process";
import Item from "../models/Item.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ✅ Add New Item with Image Upload
export const getItems = async (req, res) => {
 
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
  }
// export const getItem = async (req, res) => {
//  try {
//   const item= await Item.find({}).exec();
//   res.status(200).json(item);
//  } catch (error) {
//   console.error("Error fetching item:", error);
//   res.status(500).json({ success: false, message: "Failed to fetch item", error: error.message });
//  }
// }
export const getItem = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch items" });
  }
};

  export const addItem = async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      console.log("Uploaded Files:", req.files);
      console.log("All req.body keys:", Object.keys(req.body));
  
      // Parse JSON fields safely
      const price_per_piece = JSON.parse(req.body.price_per_piece || "{}");
      const specifications = JSON.parse(req.body.specifications || "{}");
      const supplier = JSON.parse(req.body.supplier || "{}");
      const shipping = JSON.parse(req.body.shipping || "{}");
  
      // Extract required fields
      const {
        name,
        category,
        product_category,
        description,
        MOQ,
        b2b_menu,
      } = req.body;
  
      // Extract nested fields
      const price20_199 = price_per_piece["20-199"];
      const price200_999 = price_per_piece["200-999"];
      const price1000plus = price_per_piece["1000+"];
      const supplierName = supplier.name;
      const supplierLocation = supplier.location;
      const shippingFreeAbove = shipping.free_shipping_above;
      const shippingCost = shipping.cost;
  
      // Construct objects
      const price_per_piece_obj = {
        "20-199": Number(price20_199),
        "200-999": Number(price200_999),
        "1000+": Number(price1000plus),
      };
  
      const specifications_obj = {
        color: specifications.color || "",
        weight: specifications.weight || "",
        battery: specifications.battery || "",
      };
  
      const supplier_obj = {
        name: supplierName,
        location: supplierLocation,
      };
  
      const shipping_obj = {
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
  
      // Store only the filename, not the full path
      const imageUrls = req.files.map((file) => file.filename);

    const newItem = new Item({
      name,
      category,
      product_category,
      description,
      price_per_piece: price_per_piece_obj,
      MOQ: Number(MOQ),
      specifications: specifications_obj,
      images: imageUrls,
      supplier: supplier_obj,
      shipping: shipping_obj,
      b2b_menu,
    });

    const savedItem = await newItem.save();
    console.log("Item saved successfully:", savedItem);
    res.status(201).json({ success: true, message: "Item added successfully!", data: savedItem });
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ success: false, message: "Error saving item", error: error.message });
  }
};

// ✅ Fetch All Items
export const getallItems = async (req, res) => {
  try {
    const { category } = req.query;
    const items = category ? await Item.find({ category }) : await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ success: false, message: "Failed to fetch items", error: error.message });
  }
};

export const removeitem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ success: false, message: `No item found with ID: ${id}` });
    }

    // If item has images, delete each file
    if (item.images && Array.isArray(item.images)) {
      item.images.forEach((filename) => {
        const filePath = `./uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}:`, err);
          } else {
            console.log(`Deleted file: ${filePath}`);
          }
        });
      });
    }

    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ success: false, message: "Failed to delete item", error: error.message });
  }
};




export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const existingItem = await Item.findById(id);
    if (!existingItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    // Parse nested fields
    const price_per_piece = JSON.parse(req.body.price_per_piece || "{}");
    const specifications = JSON.parse(req.body.specifications || "{}");
    const supplier = JSON.parse(req.body.supplier || "{}");
    const shipping = JSON.parse(req.body.shipping || "{}");

    const {
      name,
      category,
      product_category,
      description,
      MOQ,
      b2b_menu,
    } = req.body;

    const updatedFields = {
      name,
      category,
      product_category,
      description,
      MOQ: Number(MOQ),
      b2b_menu,
      price_per_piece: {
        "20-199": Number(price_per_piece["20-199"]),
        "200-999": Number(price_per_piece["200-999"]),
        "1000+": Number(price_per_piece["1000+"]),
      },
      specifications: {
        color: specifications.color || "",
        weight: specifications.weight || "",
        battery: specifications.battery || "",
      },
      supplier: {
        name: supplier.name || "",
        location: supplier.location || "",
      },
      shipping: {
        free_shipping_above: Number(shipping.free_shipping_above || 0),
        cost: Number(shipping.cost),
      },
    };

    // 📂 Delete old images if new ones are uploaded
    if (req.files && req.files.length > 0) {
      existingItem.images.forEach((filename) => {
        const filePath = path.join(__dirname, "../uploads", filename);
        fs.unlink(filePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error(`⚠️ Failed to delete file ${filePath}:`, err);
          } else if (err && err.code === "ENOENT") {
            console.warn(`⚠️ Skipping deletion: file not found ${filePath}`);
          }
        });
      });

      // 💾 Add new image filenames
      updatedFields.images = req.files.map((file) => file.filename);
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    console.error("❌ Error updating item:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update item",
      error: error.message,
    });
  }
};

