import ItemB2C from "../models/itemb2c.js";


// ✅ Create a new B2C item with image URLs or file uploads
export const createItemB2C = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);
    console.log("All req.body keys:", Object.keys(req.body));

    // Parse JSON fields safely
    const specifications = JSON.parse(req.body.specifications || "{}");
    const supplier = JSON.parse(req.body.supplier || "{}");
    const shipping = JSON.parse(req.body.shipping || "{}");
    const imagesFromBody = JSON.parse(req.body.images || "[]"); // Parse images as an array of URLs

    // Extract required fields
    const {
      name,
      category,
      subcategory,
      price,
      description,
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
      height: specifications.height || "",
    };

    const supplier_obj = {
      name: supplierName,
      location: supplierLocation,
    };

    const shipping_obj = {
      free_shipping_above: Number(shippingFreeAbove) || 0,
      cost: Number(shippingCost),
    };

    // Determine the source of images
    let images = [];
    if (req.files && req.files.length > 0) {
      // If files are uploaded, use them
      images = req.files.map((file) => `/uploads/${file.filename}`);
    } else if (imagesFromBody && imagesFromBody.length > 0) {
      // If image URLs are provided, use them
      images = imagesFromBody;
      // Validate that all images are valid URLs
      const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/;
      for (const image of images) {
        if (!urlPattern.test(image)) {
          return res.status(400).json({ success: false, message: `Invalid image URL: ${image}` });
        }
      }
    } else {
      // If neither files nor URLs are provided, return an error
      return res.status(400).json({ success: false, message: "At least one image (file or URL) is required" });
    }

    const requiredFields = {
      name,
      category,
      subcategory,
      price,
      description,
      brand,
      stock,
      supplierName,
      supplierLocation,
      "specifications.material": specifications.material,
      "specifications.height": specifications.height,
      shippingFreeAbove,
      shippingCost,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        console.log(`Validation failed: ${key} is missing or empty`);
        return res.status(400).json({ success: false, message: `${key} is required` });
      }
    }

    // Create new B2C item
    const newItemB2C = new ItemB2C({
      name,
      category,
      subcategory,
      price: Number(price),
      description,
      brand,
      stock: Number(stock),
      rating: Number(rating) || 0,
      images, // Use the determined images (from files or URLs)
      supplier: supplier_obj,
      specifications: specifications_obj,
      shipping: shipping_obj,
      isFeatured: isFeatured === "true" || isFeatured === true,
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

    // Use findOne with the custom 'id' field (not _id)
    const itemB2C = await ItemB2C.findOne({ id }).exec();

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
      subcategory,
      price,
      description,
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

    if (supplierData) {
      updateData.supplier = {
        name: supplierData.name || "",
        location: supplierData.location || "",
      };
    }

    if (specs) {
      updateData.specifications = {
        material: specs.material || "",
        height: specs.height || "",
      };
    }

    if (shippingData) {
      updateData.shipping = {
        free_shipping_above: Number(shippingData.free_shipping_above) || 0,
        cost: Number(shippingData.cost) || 0,
      };
    }

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updatedItemB2C = await ItemB2C.findOneAndUpdate(
      { id }, // Use custom 'id' field
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

    const deletedItemB2C = await ItemB2C.findOneAndDelete({ id });

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