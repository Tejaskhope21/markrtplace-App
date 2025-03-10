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
    <div className="products-container">
      <h1 className="products-title">{selectedCategory} Products</h1>
      <div className="subcategory-filter">
        <label className="filter-label">Sort by Subcategory: </label>
        <select
          className="filter-select"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          <option value="all">All</option>
          {uniqueSubcategories.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>
      <div className="product-flex-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-subcategory">
                Subcategory: {product.product_category}
              </p>
              <p className="product-moq">MOQ: {product.MOQ}</p>
              <p className="product-price">
                Starting Price: ₹{Object.values(product.price_per_piece)[0]}
              </p>
              <p className="product-supplier">
                Supplier: {product.supplier.name}, {product.supplier.location}
              </p>
              <button
                id="buy-btn" // Removed className="buy-button" since styling is via ID
                onClick={() => handleCategoryClick(product.id)}
              >
                Buy Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
