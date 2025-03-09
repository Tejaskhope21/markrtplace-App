import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { item_list } from "../../assets/data.js";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    navigate(`/buy?id=${id}`); // Pass only the ID
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const categoryProducts = item_list.filter(
    (item) => item.category === selectedCategory
  );

  const uniqueSubcategories = [
    ...new Set(categoryProducts.map((item) => item.product_category)),
  ];

  const [selectedSubcategory, setSelectedSubcategory] = useState("all");

  const filteredProducts = categoryProducts.filter(
    (item) =>
      selectedSubcategory === "all" ||
      item.product_category === selectedSubcategory
  );

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{selectedCategory} Products</h1>
      <div className="mb-4">
        <label className="font-semibold">Sort by Subcategory: </label>
        <select
          className="border p-2 ml-2"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          <option className="op" value="all">
            All
          </option>
          {uniqueSubcategories.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <h2 className="font-bold mt-2">{product.name}</h2>
            <p>Subcategory: {product.product_category}</p>
            <p>MOQ: {product.MOQ}</p>
            <p>Starting Price: ₹{Object.values(product.price_per_piece)[0]}</p>
            <p>
              Supplier: {product.supplier.name}, {product.supplier.location}
            </p>
            <button onClick={()=>{handleCategoryClick(product.id)}}>Buy product</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
