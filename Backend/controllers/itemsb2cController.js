import ItemB2C from "../models/itemb2c.js";

// ✅ Fetch a single B2C item by ID
export const getItemB2C = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const item = await ItemB2C.findById(id).exec();
    
    if (!item) {
      return res.status(404).json({ success: false, message: `No item found with ID: ${id}` });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("Error fetching B2C item:", error);
    res.status(500).json({ success: false, message: "Failed to fetch item", error: error.message });
  }
};

// ✅ Add New B2C Item with Image Upload
export const addItemB2C = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    // Parse JSON fields safely
    const specifications = JSON.parse(req.body.specifications || "{}");
    const supplier = JSON.parse(req.body.supplier || "{}");
    const shipping = JSON.parse(req.body.shipping || "{}");

    // Extract required fields
    const {
      name,
      category,
      subcategory,
      description,
      price,
      brand,
      stock,
      rating,
      isFeatured,
    } = req.body;

    // Extract nested fields from parsed JSON objects
    const supplierName = supplier.name;
    const supplierLocation = supplier.location;
    const shippingFreeAbove = shipping.free_shipping_above;
    const shippingCost = shipping.cost;

    // Construct objects
    const specifications_obj = {
      material: specifications.material || "",
      weight: specifications.weight || "",
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
      subcategory,
      description,
      price,
      brand,
      stock,
      rating,
      supplierName,
      supplierLocation,
      shippingCost,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        console.log(`Validation failed: ${key} is missing or empty`);
        return res.status(400).json({ success: false, message: `${key} is required` });
      }
    }

    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

    const newItem = new ItemB2C({
      name,
      category,
      subcategory,
      description,
      price: Number(price),
      brand,
      stock: Number(stock),
      rating: Number(rating),
      specifications: specifications_obj,
      images: imageUrls,
      supplier: supplier_obj,
      shipping: shipping_obj,
      isFeatured: isFeatured === "true" || isFeatured === true,
    });

    const savedItem = await newItem.save();
    console.log("B2C Item saved successfully:", savedItem);
    res.status(201).json({ success: true, message: "B2C Item added successfully!", data: savedItem });
  } catch (error) {
    console.error("Error saving B2C item:", error);
    res.status(500).json({ success: false, message: "Error saving B2C item", error: error.message });
  }
};

// ✅ Fetch All B2C Items
export const getAllItemsB2C = async (req, res) => {
  try {
    const { category } = req.query;
    const items = category ? await ItemB2C.find({ category }) : await ItemB2C.find();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching B2C items:", error);
    res.status(500).json({ success: false, message: "Failed to fetch B2C items", error: error.message });
  }
};

// ✅ Update a B2C Item by ID
export const updateItemB2C = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const {
      name,
      category,
      subcategory,
      description,
      price,
      brand,
      stock,
      rating,
      supplier,
      specifications,
      shipping,
      isFeatured,
    } = req.body;

    // Parse JSON fields if provided
    const supplierData = supplier ? JSON.parse(supplier) : undefined;
    const specs = specifications ? JSON.parse(specifications) : undefined;
    const shippingData = shipping ? JSON.parse(shipping) : undefined;

    // Construct update data
    const updateData = {};
    if (name) updateData.name = name;
    if (category) updateData.category = category;
    if (subcategory) updateData.subcategory = subcategory;
    if (price) updateData.price = Number(price);
    if (description) updateData.description = description;
    if (brand) updateData.brand = brand;
    if (stock) updateData.stock = Number(stock);
    if (rating) updateData.rating = Number(rating);
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured === "true" || isFeatured === true;

    if (supplierData) updateData.supplier = supplierData;
    if (specs) updateData.specifications = specs;
    if (shippingData) updateData.shipping = shippingData;

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updatedItemB2C = await ItemB2C.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedItemB2C) {
      return res.status(404).json({ success: false, message: "B2C item not found" });
    }

    res.status(200).json({ success: true, message: "B2C item updated successfully", data: updatedItemB2C });
  } catch (error) {
    console.error("Error updating B2C item:", error);
    res.status(500).json({ success: false, message: "Error updating B2C item", error: error.message });
  }
};

// ✅ Delete a B2C Item by ID
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
