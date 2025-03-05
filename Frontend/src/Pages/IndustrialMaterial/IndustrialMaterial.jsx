import { useState } from "react";
import { menu_list, item_list } from "../../assets/data.js";
import "./IndustrialMaterial.css";

export default function IndustrialMaterial() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // Filter only Industrial Material products
  const filteredItems = item_list.filter(
    (item) =>
      item.category === "Industrial Material" &&
      (!selectedCategory || item.category === selectedCategory) &&
      (!selectedSubCategory || item.product_category === selectedSubCategory)
  );

  const getSubCategories = () => {
    if (!selectedCategory) return [];
    return [
      ...new Set(
        item_list
          .filter(
            (item) =>
              item.category === selectedCategory && item.product_category
          )
          .map((item) => item.product_category)
      ),
    ];
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Industrial Material Products</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="p-2 border rounded"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubCategory("");
          }}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {menu_list
            .filter((menu) => menu.menu_item === "Industrial Material")
            .map((menu) => (
              <option key={menu.menu_item} value={menu.menu_item}>
                {menu.menu_item}
              </option>
            ))}
        </select>
        {selectedCategory && getSubCategories().length > 0 && (
          <select
            className="p-2 border rounded"
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            value={selectedSubCategory}
          >
            <option value="">All Subcategories</option>
            {getSubCategories().map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-bold mt-2">{item.name}</h2>
              <p className="text-sm text-gray-600">
                {item.category} - {item.product_category}
              </p>
              <p className="text-sm">MOQ: {item.MOQ}</p>
              <p className="text-sm font-bold">
                Starting Price: ₹{Object.values(item.price_per_piece)[0]}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No Industrial Material products found.
          </p>
        )}
      </div>
    </div>
  );
}
