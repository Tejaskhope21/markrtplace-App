import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  '20-199': {
    type: Number,
    required: true,
  },
  '200-999': {
    type: Number,
    required: true,
  },
  '1000+': {
    type: Number,
    required: true,
  },
});

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
});

const shippingSchema = new mongoose.Schema({
  free_shipping_above: {
    type: Number,
    required: false,
    default: 0,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const itemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['ElectricalMaterial', 'IndustrialMaterial', 'Fabric'], // Ensures valid categories
  },
  product_category: {
    type: String,
    required: true,
    trim: true,
  },
  price_per_piece: {
    type: priceSchema,
    required: true,
  },
  MOQ: {
    type: Number,
    required: true,
  },
  specifications: {

    type: Map,
    of: String, // Allows dynamic key-value pairs
// =======
//     type: {
//       conductor_material: String,
//       voltage_rating: String,
//       wire_gauge: [String],
//       power_rating: String,
//       color_temperature: [String],
//       input_voltage: String,
//       type: [String],
//       rated_current: [String],
//       length: [String],
//       wire_type: String,
//       plug_type: String,
//       power: [String],
//       phase: String,
//       dimensions: [String],
//       thickness: [String],
//       sizes: [String],
//       grades: [String],
//       material: [String],
//       colors: [String],
//       packaging: [String],
//       strength: [String]
//     },
//     default: {} // Allow empty object as default
// >>>>>>> 97c5ff45b22cc05aa6f15e46e789fbdb9223baf7
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  supplier: {
    type: supplierSchema,
    required: true,
  },
  shipping: {

    type: shippingSchema,
    required: true,
  },
  b2b_menu: {
    type: String,
    required: true,
    enum: ['ElectricalMaterial', 'IndustrialMaterial', 'Fabric'], // Matches the select menu options
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
// =======
//     free_shipping_above: {
//       type: Number,
//       default: 0
//     },
//     cost: {
//       type: Number,
//       required: true
//     }
//   },
//   b2b_menu: {
//     menu_item: {
//       type: String,
//       enum: ['ElectricalMaterial', 'IndustrialMaterial', 'Fabric'],
//       required: true // Make this required since it's a critical field
//     },
//     menu_img: {
//       type: String,
//       default: null
//     }
//   }
// >>>>>>> 97c5ff45b22cc05aa6f15e46e789fbdb9223baf7
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
