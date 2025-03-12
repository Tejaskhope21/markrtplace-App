import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { item_list } from "../../assets/data.js";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/buy?id=${id}`); // Navigate to product details page
  };

  const handleButtonClick = (e, id) => {
    e.stopPropagation(); // Stop the event from propagating to the parent card
    console.log(`Buy button clicked for product ID: ${id}`);
    // You can add other button-specific logic here (e.g., adding to cart)
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
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleCardClick(product.id)} // Handle card click
          >
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
                Starting Price: ₹
                {Object.values(product.price_per_piece)[0] || "N/A"}
              </p>
              <p className="product-supplier">
                Supplier: {product.supplier.name}, {product.supplier.location}
              </p>
              {/* Fix: Stop propagation here */}
              <button
                id="buy-btn"
                onClick={(e) => handleButtonClick(e, product.id)}
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
