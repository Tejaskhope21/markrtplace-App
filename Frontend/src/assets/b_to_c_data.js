export const product=[
  {
    product_img:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-101820-stem-toys-1602865117.png?crop=0.506xw:0.778xh;0.220xw,0.222xh&resize=640:*",
   product_name: "toys"
  },
  {
    product_img:"https://tse1.mm.bing.net/th?id=OIP.hjiMwwbCviAebnpGZzTKOgHaHa&pid=Api&P=0&w=400&h=400",
  product_name: "clothes"
  },
  {
    product_img:"https://tse2.mm.bing.net/th?id=OIF.XNz49xrAqVzUTTj3B0nYPQ&pid=Api&H=160&W=160",
  product_name: "laptops"
  },
  {
    product_img:"https://tse2.mm.bing.net/th?id=OIF.1oIjZvJh8gC6QL7ZNYNJxg&pid=Api&P=0&w=400&h=456",
 product_name: "headphones"
  }
]
export const productcategory = [
  {
    id: 1564,
    name: "Action Figure - Superhero",
    category: "toys",
    subcategory: "action-figures",
    price: 19.99,
    description: "A high-quality action figure of a popular superhero.",
    brand: "ToyCo",
    stock: 100,
    rating: 4.5,
    images: [
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-101820-stem-toys-1602865117.png?crop=0.506xw:0.778xh;0.220xw,0.222xh&resize=640:*",
      "https://example.com/superhero2.jpg",
    ],
    supplier: {
      name: "ToyCo Supplier",
      location: "USA",
    },
    specifications: {
      material: "Plastic",
      height: "12 inches",
    },
    shipping: {
      free_shipping_above: 50,
      cost: 5,
    },
    MOQ: 10,
    isFeatured: true, // New attribute added
  },
  {
    id: 2000,
    name: "Men's Cotton T-Shirt",
    category: "clothes",
    subcategory: "men-clothing",
    price: 25.0,
    description: "Comfortable and stylish cotton t-shirt for men.",
    brand: "FashionHub",
    stock: 200,
    rating: 4.7,
    images: [
      "https://example.com/tshirt1.jpg",
      "https://example.com/tshirt2.jpg",
    ],
    supplier: {
      name: "FashionHub Supplier",
      location: "India",
    },
    specifications: {
      material: "Cotton",
      size: "M, L, XL",
    },
    shipping: {
      free_shipping_above: 100,
      cost: 0,
    },
    MOQ: 50,
    isFeatured: false, // New attribute added
  },
  {
    id: 33450,
    name: "Gaming Laptop - X200",
    category: "laptops",
    subcategory: "gaming-laptops",
    price: 1200.0,
    description: "High-performance gaming laptop with RTX 3060 GPU.",
    brand: "TechPro",
    stock: 50,
    rating: 4.8,
    images: [
      "https://tse2.mm.bing.net/th?id=OIF.XNz49xrAqVzUTTj3B0nYPQ&pid=Api&H=160&W=160",
      "https://example.com/laptop2.jpg",
    ],
    supplier: {
      name: "TechPro Supplier",
      location: "China",
    },
    specifications: {
      processor: "Intel i7",
      ram: "16GB",
      storage: "512GB SSD",
    },
    shipping: {
      free_shipping_above: 500,
      cost: 20,
    },
    MOQ: 5,
    isFeatured: true, // New attribute added
  },
  {
    id: 4060,
    name: "Wireless Noise-Cancelling Headphones",
    category: "headphones",
    subcategory: "wireless-headphones",
    price: 199.99,
    description: "Premium wireless headphones with active noise cancellation.",
    brand: "SoundMax",
    stock: 150,
    rating: 4.6,
    images: [
      "https://example.com/headphones1.jpg",
      "https://example.com/headphones2.jpg",
    ],
    supplier: {
      name: "SoundMax Supplier",
      location: "Germany",
    },
    specifications: {
      battery_life: "30 hours",
      connectivity: "Bluetooth 5.0",
    },
    shipping: {
      free_shipping_above: 200,
      cost: 10,
    },
    MOQ: 20,
    isFeatured: false, // New attribute added
  },
  {
    id: 5060,
    name: "LEGO City Police Station",
    category: "toys",
    subcategory: "building-toys",
    price: 59.99,
    description: "Build your own police station with this LEGO set.",
    brand: "LEGO",
    stock: 75,
    rating: 4.9,
    images: [
      "https://example.com/lego1.jpg",
      "https://example.com/lego2.jpg",
    ],
    supplier: {
      name: "LEGO Store",
      location: "Denmark",
    },
    specifications: {
      power_rating: "36W",
      color_temperature: "3000K, 4000K, 6000K",
      input_voltage: "AC 220V",
    },
    shipping: {
      free_shipping_above: 3000,
      cost: 0,
    },
    MOQ: 20,
    isFeatured: true, // New attribute added
  },
  {
    id: 60606,
    name: "Women's Denim Jacket",
    category: "clothes",
    subcategory: "women-clothing",
    price: 45.0,
    description: "Stylish denim jacket for women.",
    brand: "DenimWorks",
    stock: 120,
    rating: 4.4,
    images: [
      "https://tse1.mm.bing.net/th?id=OIP.hjiMwwbCviAebnpGZzTKOgHaHa&pid=Api&P=0&w=400&h=400",
      "https://example.com/jacket2.jpg",
    ],
    supplier: {
      name: "DenimWorks Supplier",
      location: "USA",
    },
    specifications: {
      material: "Denim",
      size: "S, M, L",
    },
    shipping: {
      free_shipping_above: 75,
      cost: 5,
    },
    MOQ: 30,
    isFeatured: false, // New attribute added
  },
  {
    id: 7060,
    name: "Ultrabook - SlimBook Pro",
    category: "laptops",
    subcategory: "ultrabooks",
    price: 999.99,
    description: "Lightweight and powerful ultrabook for professionals.",
    brand: "SlimTech",
    stock: 80,
    rating: 4.7,
    images: [
      "https://example.com/ultrabook1.jpg",
      "https://example.com/ultrabook2.jpg",
    ],
    supplier: {
      name: "SlimTech Supplier",
      location: "Taiwan",
    },
    specifications: {
      processor: "Intel i5",
      ram: "8GB",
      storage: "256GB SSD",
    },
    shipping: {
      free_shipping_above: 1000,
      cost: 0,
    },
    MOQ: 10,
    isFeatured: true, // New attribute added
  },
  {
    id: 8060,
    name: "In-Ear Wireless Earbuds",
    category: "headphones",
    subcategory: "wireless-earbuds",
    price: 79.99,
    description: "Compact and comfortable wireless earbuds.",
    brand: "AudioPlus",
    stock: 300,
    rating: 4.3,
    images: [
      "https://tse2.mm.bing.net/th?id=OIF.1oIjZvJh8gC6QL7ZNYNJxg&pid=Api&P=0&w=400&h=456",
      "https://example.com/earbuds2.jpg",
    ],
    supplier: {
      name: "AudioPlus Supplier",
      location: "China",
    },
    specifications: {
      battery_life: "20 hours",
      connectivity: "Bluetooth 5.0",
    },
    shipping: {
      free_shipping_above: 100,
      cost: 5,
    },
    MOQ: 50,
    isFeatured: false, // New attribute added
  },
];
  
 

  export default {product,productcategory} 