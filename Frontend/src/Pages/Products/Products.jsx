import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSort, setSelectedSort] = useState(""); // Sorting state
  const [productCategories, setProductCategories] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState("all");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!selectedCategory) throw new Error("No category selected");

        const url = `http://localhost:5000/api/items?category=${encodeURIComponent(
          selectedCategory
        )}`;
        console.log("Fetching from:", url);

        const response = await axios.get(url);

        if (Array.isArray(response.data)) {
          setItems(response.data);

          // Extract unique product categories
          const uniqueProductCategories = [
            ...new Set(response.data.map((item) => item.product_category)),
          ];
          setProductCategories(uniqueProductCategories);
        } else if (response.data.success === false) {
          setError(response.data.message);
          setItems([]);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching items:", err);
        setError(
          err.message === "Network Error"
            ? "Failed to connect to the server. Please ensure the backend is running."
            : err.response?.data?.message || "Failed to load items."
        );
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  // **Filtering and Sorting Logic**
  let filteredItems = items;

  if (selectedProductCategory !== "all") {
    filteredItems = filteredItems.filter(
      (item) => item.product_category === selectedProductCategory
    );
  }

  if (selectedSort === "price_low") {
    filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
  } else if (selectedSort === "price_high") {
    filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);
  } else if (selectedSort === "rating") {
    filteredItems = [...filteredItems].sort((a, b) => b.rating - a.rating);
  }

  const handleCategoryClick = (id) => {
    navigate(`/buy?id=${id}`);
  };

  return (
    <div className="products-container">
      <h1 className="products-title">{selectedCategory} Items</h1>

      {/* Product Category Filter */}
      {productCategories.length > 0 && (
        <div className="filter-section">
          <label>Product Category: </label>
          <select
            value={selectedProductCategory}
            onChange={(e) => setSelectedProductCategory(e.target.value)}
          >
            <option value="all">All</option>
            {productCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Sorting Dropdown */}
      <div className="filter-section">
        <label>Sort By: </label>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Products Display */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="product-flex-container">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item._id} className="product-card">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="product-image"
                  onError={(e) => {
                    console.error(`Failed to load image: ${item.images[0]}`);
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                <h2>{item.name}</h2>
                <p className="product-description">
                  {item.description || "No description available."}
                </p>
                <p>
                  Price: ₹{item.price || Object.values(item.price_per_piece)[0]}
                </p>
                <p>Rating: {item.rating || "N/A"} / 5</p>
                <button onClick={() => handleCategoryClick(item._id)}>
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No items found for this selection.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
