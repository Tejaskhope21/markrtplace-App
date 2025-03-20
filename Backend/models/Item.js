import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  product_category: {
    type: String,
    required: true
  },
  price_per_piece: {
    type: Map,
    of: Number,
    required: true
  },
  MOQ: {
    type: Number,
    required: true
  },
  specifications: {
    type: {
      conductor_material: String,
      voltage_rating: String,
      wire_gauge: [String],
      power_rating: String,
      color_temperature: [String],
      input_voltage: String,
      type: [String],
      rated_current: [String],
      length: [String],
      wire_type: String,
      plug_type: String,
      power: [String],
      phase: String,
      dimensions: [String],
      thickness: [String],
      sizes: [String],
      grades: [String],
      material: [String],
      colors: [String],
      packaging: [String],
      strength: [String]
    },
    default: {} // Allow empty object as default
  },
  images: {
    type: [String],
    required: true
  },
  supplier: {
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  shipping: {
    free_shipping_above: {
      type: Number,
      default: 0
    },
    cost: {
      type: Number,
      required: true
    }
  },
  b2b_menu: {
    menu_item: {
      type: String,
      enum: ['ElectricalMaterial', 'IndustrialMaterial', 'Fabric'],
      required: true // Make this required since it's a critical field
    },
    menu_img: {
      type: String,
      default: null
    }
  }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;