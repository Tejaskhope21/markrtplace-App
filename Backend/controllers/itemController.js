import Item from "../models/Item.js";

// ✅ Add New Item with Image Upload
export const addItem = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const {
      id,
      name,
      category,
      product_category,
      price_per_piece,
      MOQ,
      specifications,
      supplier,
      shipping,
      b2b_menu,
    } = req.body;

    if (
      !id ||
      !name ||
      !category ||
      !product_category ||
      !price_per_piece ||
      !MOQ ||
      !supplier ||
      !shipping ||
      !b2b_menu
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // ✅ Process Image Uploads
    const imageUrls = req.files.map((file) => file.path);

    const newItem = new Item({
      id,
      name,
      category,
      product_category,
      price_per_piece: JSON.parse(price_per_piece),
      MOQ,
      specifications: JSON.parse(specifications),
      supplier: JSON.parse(supplier),
      shipping: JSON.parse(shipping),
      images: imageUrls,
      b2b_menu,
    });

    await newItem.save();
    res.status(201).json({ success: true, message: "Item added successfully", item: newItem });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to add item", error });
  }
};

// ✅ Fetch All Items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items", error });
  }
};
