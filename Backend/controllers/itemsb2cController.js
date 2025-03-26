import ItemB2C from "../models/itemb2c.js";

// ✅ Create a new B2C item with image upload
export const createItemB2C = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const {
      name,
      category,
      product_category,
      description,
      MOQ,
      price_per_piece, // Expecting JSON string
      specifications,  // Expecting JSON string
      supplier,       // Expecting JSON string
      shipping,       // Expecting JSON string
      b2c_menu,       // B2C-specific field (assuming similar to b2b_menu)
    } = req.body;

    // Parse JSON fields safely
    const pricePerPiece = JSON.parse(price_per_piece || "{}");
    const specs = JSON.parse(specifications || "{}");
    const supplierData = JSON.parse(supplier || "{}");
    const shippingData = JSON.parse(shipping || "{}");

    // Construct nested objects
    const price_per_piece_obj = {
      "20-199": Number(pricePerPiece["20-199"]) || 0,
      "200-999": Number(pricePerPiece["200-999"]) || 0,
      "1000+": Number(pricePerPiece["1000+"]) || 0,
    };

    const specifications_obj = {
      color: specs.color || "",
      weight: specs.weight || "",
      battery: specs.battery || "",
    };

    const supplier_obj = {
      name: supplierData.name || "",
      location: supplierData.location || "",
    };

    const shipping_obj = {
      free_shipping_above: Number(shippingData.free_shipping_above) || 0,
      cost: Number(shippingData.cost) || 0,
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
      b2c_menu,
      "price_per_piece[20-199]": pricePerPiece["20-199"],
      "price_per_piece[200-999]": pricePerPiece["200-999"],
      "price_per_piece[1000+]": pricePerPiece["1000+"],
      "supplier.name": supplierData.name,
      "supplier.location": supplierData.location,
      "shipping.cost": shippingData.cost,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        console.log(`Validation failed: ${key} is missing or empty`);
        return res.status(400).json({ success: false, message: `${key} is required` });
      }
    }

    const images = req.files.map((file) => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      originalname: file.originalname,
    }));

    const newItemB2C = new ItemB2C({
      name,
      category,
      product_category,
      description,
      price_per_piece: price_per_piece_obj,
      MOQ: Number(MOQ),
      specifications: specifications_obj,
      images,
      supplier: supplier_obj,
      shipping: shipping_obj,
      b2c_menu,
    });

    const savedItemB2C = await newItemB2C.save();
    console.log("B2C item saved successfully:", savedItemB2C);
    res.status(201).json({ success: true, message: "B2C item created successfully", data: savedItemB2C });
  } catch (error) {
    console.error("Error creating B2C item:", error);
    res.status(500).json({ success: false, message: "Error creating B2C item", error: error.message });
  }
};

// ✅ Get all B2C items
export const getAllItemsB2C = async (req, res) => {
  try {
    const { category } = req.query;
    const itemsB2C = category ? await ItemB2C.find({ category }) : await ItemB2C.find();
    res.status(200).json({ success: true, message: "B2C items retrieved successfully", data: itemsB2C });
  } catch (error) {
    console.error("Error retrieving B2C items:", error);
    res.status(500).json({ success: false, message: "Error retrieving B2C items", error: error.message });
  }
};

// ✅ Get a single B2C item by ID
export const getItemB2CById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const itemB2C = await ItemB2C.findById(id).exec();

    if (!itemB2C) {
      return res.status(404).json({ success: false, message: `No B2C item found with ID: ${id}` });
    }

    res.status(200).json({ success: true, message: "B2C item retrieved successfully", data: itemB2C });
  } catch (error) {
    console.error("Error retrieving B2C item:", error);
    res.status(500).json({ success: false, message: "Error retrieving B2C item", error: error.message });
  }
};

// ✅ Update a B2C item by ID with optional image upload
export const updateItemB2C = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const {
      name,
      category,
      product_category,
      description,
      MOQ,
      price_per_piece,
      specifications,
      supplier,
      shipping,
      b2c_menu,
    } = req.body;

    // Parse JSON fields if provided
    const pricePerPiece = price_per_piece ? JSON.parse(price_per_piece) : undefined;
    const specs = specifications ? JSON.parse(specifications) : undefined;
    const supplierData = supplier ? JSON.parse(supplier) : undefined;
    const shippingData = shipping ? JSON.parse(shipping) : undefined;

    const updateData = {};
    if (name) updateData.name = name;
    if (category) updateData.category = category;
    if (product_category) updateData.product_category = product_category;
    if (description) updateData.description = description;
    if (MOQ) updateData.MOQ = Number(MOQ);
    if (b2c_menu) updateData.b2c_menu = b2c_menu;

    if (pricePerPiece) {
      updateData.price_per_piece = {
        "20-199": Number(pricePerPiece["20-199"]) || 0,
        "200-999": Number(pricePerPiece["200-999"]) || 0,
        "1000+": Number(pricePerPiece["1000+"]) || 0,
      };
    }

    if (specs) {
      updateData.specifications = {
        color: specs.color || "",
        weight: specs.weight || "",
        battery: specs.battery || "",
      };
    }

    if (supplierData) {
      updateData.supplier = {
        name: supplierData.name || "",
        location: supplierData.location || "",
      };
    }

    if (shippingData) {
      updateData.shipping = {
        free_shipping_above: Number(shippingData.free_shipping_above) || 0,
        cost: Number(shippingData.cost) || 0,
      };
    }

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => ({
        filename: file.filename,
        path: `/uploads/${file.filename}`,
        originalname: file.originalname,
      }));
    }

    const updatedItemB2C = await ItemB2C.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItemB2C) {
      return res.status(404).json({ success: false, message: "B2C item not found" });
    }

    res.status(200).json({ success: true, message: "B2C item updated successfully", data: updatedItemB2C });
  } catch (error) {
    console.error("Error updating B2C item:", error);
    res.status(500).json({ success: false, message: "Error updating B2C item", error: error.message });
  }
};

// ✅ Delete a B2C item by ID
export const deleteItemB2C = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const deletedItemB2C = await ItemB2C.findByIdAndDelete(id);

    if (!deletedItemB2C) {
      return res.status(404).json({ success: false, message: "B2C item not found" });
    }

    res.status(200).json({ success: true, message: "B2C item deleted successfully", data: deletedItemB2C });
  } catch (error) {
    console.error("Error deleting B2C item:", error);
    res.status(500).json({ success: false, message: "Error deleting B2C item", error: error.message });
  }
};

// ✅ Get featured B2C items
export const getFeaturedItemsB2C = async (req, res) => {
  try {
    const featuredItemsB2C = await ItemB2C.find({ isFeatured: true });
    res.status(200).json({ success: true, message: "Featured B2C items retrieved successfully", data: featuredItemsB2C });
  } catch (error) {
    console.error("Error retrieving featured B2C items:", error);
    res.status(500).json({ success: false, message: "Error retrieving featured B2C items", error: error.message });
  }
};