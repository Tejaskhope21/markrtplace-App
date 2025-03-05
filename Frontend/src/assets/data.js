export const menu_list = [
  {
    menu_item: "Electrical Material",
    menu_img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg"
  },
  {
    menu_item: "Industrial Material",
    menu_img: "https://images.pexels.com/photos/5371455/pexels-photo-5371455.jpeg"
  },
  {
    menu_item: "Fabric",
    menu_img: "https://images.pexels.com/photos/2899611/pexels-photo-2899611.jpeg"
  }
];

export const item_list = [
  {
    id: 1,
    name: "Industrial Copper Wires",
    category: "Electrical Material",
    product_category: "Wires", // Added product_category
    price_per_piece: {
      "50-499": 2000,
      "500-1999": 1800,
      "2000+": 1600,
    },
    MOQ: 50,
    specifications: {
      conductor_material: "Copper",
      voltage_rating: "600V",
      wire_gauge: ["10 AWG", "12 AWG", "14 AWG"],
    },
    images: [
      "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
      "https://images.pexels.com/photos/569163/pexels-photo-569163.jpeg",
      "https://images.pexels.com/photos/256428/pexels-photo-256428.jpeg",
      "https://images.pexels.com/photos/3353208/pexels-photo-3353208.jpeg",
    ],
    supplier: {
      name: "Mumbai Electricals Ltd.",
      location: "Mumbai, India",
    },
    shipping: {
      free_shipping_above: 5000,
      cost: 1000,
    },
  },
  {
    id: 2,
    name: "LED Panel Lights",
    category: "Electrical Material",
    product_category: "Lights", // Added product_category
    price_per_piece: {
      "20-199": 850,
      "200-999": 750,
      "1000+": 650,
    },
    MOQ: 20,
    specifications: {
      power_rating: "36W",
      color_temperature: ["3000K", "4000K", "6000K"],
      input_voltage: "AC 220V",
    },
    images: [
      "https://images.pexels.com/photos/45072/pexels-photo-45072.jpeg",
      "https://images.pexels.com/photos/276334/pexels-photo-276334.jpeg",
      "https://images.pexels.com/photos/1586341/pexels-photo-1586341.jpeg",
      "https://images.pexels.com/photos/130654/pexels-photo-130654.jpeg",
    ],
    supplier: {
      name: "Jaipur LED Solutions",
      location: "Jaipur, India",
    },
    shipping: {
      free_shipping_above: 3000,
      cost: 500,
    },
  },
  {
    id: 3,
    name: "Circuit Breakers (MCB)",
    category: "Electrical Material",
    product_category: "Switchboards", // Added product_category
    price_per_piece: {
      "10-99": 600,
      "100-499": 500,
      "500+": 400,
    },
    MOQ: 10,
    specifications: {
      type: ["Single Pole", "Double Pole", "Three Pole"],
      rated_current: ["6A", "10A", "16A", "32A"],
      voltage_rating: "240V",
    },
    images: [
      "https://images.pexels.com/photos/5991325/pexels-photo-5991325.jpeg",
      "https://images.pexels.com/photos/8531260/pexels-photo-8531260.jpeg",
      "https://images.pexels.com/photos/668362/pexels-photo-668362.jpeg",
      "https://images.pexels.com/photos/3441731/pexels-photo-3441731.jpeg",
    ],
    supplier: {
      name: "Delhi Electrical Components",
      location: "Delhi, India",
    },
    shipping: {
      free_shipping_above: 2000,
      cost: 300,
    },
  },
  {
    id: 4,
    name: "Industrial Extension Cords",
    category: "Electrical Material",
    product_category: "Cables", // Added product_category
    price_per_piece: {
      "50-499": 1200,
      "500-1999": 1000,
      "2000+": 900,
    },
    MOQ: 50,
    specifications: {
      length: ["5m", "10m", "15m"],
      wire_type: "Heavy-Duty Copper",
      plug_type: "3-Pin",
    },
    images: [
      "https://images.pexels.com/photos/813310/pexels-photo-813310.jpeg",
      "https://images.pexels.com/photos/462026/pexels-photo-462026.jpeg",
      "https://images.pexels.com/photos/68174/pexels-photo-68174.jpeg",
      "https://images.pexels.com/photos/462026/pexels-photo-462026.jpeg",
    ],
    supplier: {
      name: "Bangalore Industrial Supplies",
      location: "Bangalore, India",
    },
    shipping: {
      free_shipping_above: 4000,
      cost: 700,
    },
  },
  {
    id: 5,
    name: "Electric Motors (3-Phase)",
    category: "Electrical Material",
    product_category: "Motors", // Added product_category
    price_per_piece: {
      "5-49": 15000,
      "50-199": 14000,
      "200+": 13000,
    },
    MOQ: 5,
    specifications: {
      power: ["1 HP", "3 HP", "5 HP"],
      voltage_rating: "415V",
      phase: "3-Phase",
    },
    images: [
      "https://images.pexels.com/photos/442156/pexels-photo-442156.jpeg",
      "https://images.pexels.com/photos/241544/pexels-photo-241544.jpeg",
      "https://images.pexels.com/photos/3184225/pexels-photo-3184225.jpeg",
      "https://images.pexels.com/photos/1038047/pexels-photo-1038047.jpeg",
    ],
    supplier: {
      name: "Chennai Electric Motors",
      location: "Chennai, India",
    },
    shipping: {
      free_shipping_above: 10000,
      cost: 1500,
    },
  },
  {
    id: 6, // Changed from 1 to 6
    name: "Galvanized Steel Sheets",
    category: "Industrial Material",
    price_per_piece: {
      "50-499": 2500,
      "500-1999": 2300,
      "2000+": 2100,
    },
    MOQ: 50,
    dimensions: ["4x8 ft", "5x10 ft", "6x12 ft"],
    thickness: ["0.5mm", "1mm", "1.5mm", "2mm"],
    images: [
      "https://images.pexels.com/photos/5371455/pexels-photo-5371455.jpeg",
      "https://images.pexels.com/photos/3620047/pexels-photo-3620047.jpeg",
      "https://images.pexels.com/photos/590819/pexels-photo-590819.jpeg",
      "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg",
    ],
    supplier: {
      name: "Tata Steel Industries",
      location: "Jamshedpur, India",
    },
    shipping: {
      free_shipping_above: 5000,
      cost: 1500,
    },
  },
  {
    id: 7, // Changed from 2 to 7
    name: "High-Strength Industrial Bolts",
    category: "Industrial Material",
    price_per_piece: {
      "100-999": 50,
      "1000-4999": 40,
      "5000+": 30,
    },
    MOQ: 100,
    sizes: ["M6", "M8", "M10", "M12", "M16"],
    grades: ["Grade 8.8", "Grade 10.9", "Grade 12.9"],
    images: [
      "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg",
      "https://images.pexels.com/photos/349615/pexels-photo-349615.jpeg",
      "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg",
      "https://images.pexels.com/photos/1912421/pexels-photo-1912421.jpeg",
    ],
    supplier: {
      name: "Ludhiana Fasteners Pvt. Ltd.",
      location: "Ludhiana, India",
    },
    shipping: {
      free_shipping_above: 10000,
      cost: 500,
    },
  },
  {
    id: 8, // Changed from 3 to 8
    name: "Industrial-Grade Hydraulic Pipes",
    category: "Industrial Material",
    price_per_piece: {
      "20-199": 1500,
      "200-999": 1300,
      "1000+": 1100,
    },
    MOQ: 20,
    length: ["3m", "6m", "12m"],
    diameter: ["2 inch", "4 inch", "6 inch"],
    images: [
      "https://images.pexels.com/photos/452738/pexels-photo-452738.jpeg",
      "https://images.pexels.com/photos/220769/pexels-photo-220769.jpeg",
      "https://images.pexels.com/photos/3044470/pexels-photo-3044470.jpeg",
      "https://images.pexels.com/photos/4153255/pexels-photo-4153255.jpeg",
    ],
    supplier: {
      name: "Pune Industrial Tubes",
      location: "Pune, India",
    },
    shipping: {
      free_shipping_above: 3000,
      cost: 2000,
    },
  },
  {
    id: 9, // Changed from 4 to 9
    name: "Heat-Resistant Industrial Gloves",
    category: "Industrial Material",
    price_per_piece: {
      "50-499": 250,
      "500-1999": 225,
      "2000+": 200,
    },
    MOQ: 50,
    material: ["Kevlar", "Leather", "Rubber"],
    sizes: ["M", "L", "XL"],
    images: [
      "https://images.pexels.com/photos/1509254/pexels-photo-1509254.jpeg",
      "https://images.pexels.com/photos/3846985/pexels-photo-3846985.jpeg",
      "https://images.pexels.com/photos/3826403/pexels-photo-3826403.jpeg",
      "https://images.pexels.com/photos/8451183/pexels-photo-8451183.jpeg",
    ],
    supplier: {
      name: "Kolkata Safety Gears",
      location: "Kolkata, India",
    },
    shipping: {
      free_shipping_above: 5000,
      cost: 300,
    },
  },
  {
    id: 10, // Changed from 5 to 10
    name: "Concrete Mix (Bulk Bags)",
    category: "Industrial Material",
    price_per_piece: {
      "10-99": 1200,
      "100-499": 1100,
      "500+": 1000,
    },
    MOQ: 10,
    packaging: ["25kg Bag", "50kg Bag", "100kg Bag"],
    strength: ["M15", "M20", "M25", "M30"],
    images: [
      "https://images.pexels.com/photos/3696154/pexels-photo-3696154.jpeg",
      "https://images.pexels.com/photos/1561726/pexels-photo-1561726.jpeg",
      "https://images.pexels.com/photos/4525855/pexels-photo-4525855.jpeg",
      "https://images.pexels.com/photos/1543306/pexels-photo-1543306.jpeg",
    ],
    supplier: {
      name: "Ultratech Cement Suppliers",
      location: "Bangalore, India",
    },
    shipping: {
      free_shipping_above: 2000,
      cost: 1500,
    },
  },
  {
    id: 11, // Changed from 1 to 11
    name: "Men's T-Shirts (100% Cotton)",
    category: "Fabric",
    price_per_piece: {
      "50-499": 150,
      "500-1999": 135,
      "2000+": 120,
    },
    MOQ: 50,
    colors: ["Black", "White", "Gray", "Navy Blue", "Red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.pexels.com/photos/1361081/pexels-photo-1361081.jpeg",
      "https://images.pexels.com/photos/2955378/pexels-photo-2955378.jpeg",
      "https://images.pexels.com/photos/1808457/pexels-photo-1808457.jpeg",
      "https://images.pexels.com/photos/1036617/pexels-photo-1036617.jpeg",
    ],
    supplier: {
      name: "Mumbai Textile Hub",
      location: "Mumbai, India",
    },
    shipping: {
      free_shipping_above: 1000,
      cost: 0,
    },
  },
  {
    id: 12, // Changed from 2 to 12
    name: "Women's Summer Dresses",
    category: "Fabric",
    price_per_piece: {
      "20-99": 450,
      "100-499": 400,
      "500+": 350,
    },
    MOQ: 20,
    colors: ["Floral Print", "Blue", "Pink", "Green"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.pexels.com/photos/2909611/pexels-photo-2909611.jpeg",
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg",
      "https://images.pexels.com/photos/270320/pexels-photo-270320.jpeg",
      "https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg",
    ],
    supplier: {
      name: "Jaipur Ethnic Wear",
      location: "Jaipur, India",
    },
    shipping: {
      free_shipping_above: null,
      cost: 500,
    },
  },
  {
    id: 13, // Changed from 3 to 13
    name: "Unisex Hoodies (Fleece Lined)",
    category: "Fabric",
    price_per_piece: {
      "30-199": 700,
      "200-999": 650,
      "1000+": 600,
    },
    MOQ: 30,
    colors: ["Black", "White", "Gray", "Red", "Yellow", "Green"],
    sizes: ["M", "L", "XL", "XXL", "3XL"],
    images: [
      "https://images.pexels.com/photos/7679455/pexels-photo-7679455.jpeg",
      "https://images.pexels.com/photos/5686846/pexels-photo-5686846.jpeg",
      "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg",
      "https://images.pexels.com/photos/373564/pexels-photo-373564.jpeg",
    ],
    supplier: {
      name: "Delhi Fashion Apparel",
      location: "Delhi, India",
    },
    shipping: {
      free_shipping_above: 500,
      cost: 0,
    },
  },
  {
    id: 14, // Changed from 4 to 14
    name: "Kids' Cartoon Printed T-Shirts",
    category: "Fabric",
    price_per_piece: {
      "100-499": 90,
      "500-1999": 75,
      "2000+": 65,
    },
    MOQ: 100,
    colors: ["Red", "Blue", "Yellow", "Green", "White"],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    images: [
      "https://images.pexels.com/photos/8078999/pexels-photo-8078999.jpeg",
      "https://images.pexels.com/photos/5225123/pexels-photo-5225123.jpeg",
      "https://images.pexels.com/photos/320619/pexels-photo-320619.jpeg",
      "https://images.pexels.com/photos/167475/pexels-photo-167475.jpeg",
    ],
    supplier: {
      name: "Tirupur Kids Wear",
      location: "Tirupur, India",
    },
    shipping: {
      free_shipping_above: null,
      cost: 300,
    },
  },
]


export default { menu_list, item_list };