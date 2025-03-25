import mongoose from "mongoose";
import { uid } from "uid";

const priceSchema = new mongoose.Schema({
  "20-199": { type: Number, required: true },
  "200-999": { type: Number, required: true },
  "1000+": { type: Number, required: true },
});

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
});

const shippingSchema = new mongoose.Schema({
  free_shipping_above: { type: Number, default: 0 },
  cost: { type: Number, required: true },
});

const itemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => uid(6),
  },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  product_category: { type: String, required: true, trim: true },
  price_per_piece: { type: priceSchema, required: true },
  MOQ: { type: Number, required: true },
  specifications: { type: Map, of: String, default: {} },
  images: { type: [String], required: true },
  supplier: { type: supplierSchema, required: true },
  shipping: { type: shippingSchema, required: true },
  b2b_menu: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;