import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ShoppingProduct.css";

function ShoppingProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shopCategory, setShopCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState(""); // Sorting state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:5000/api/itemsb2c?category=${selectedCategory}`
        );

        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          setError("Invalid data format received.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory]);

  const handleCategoryClick = (id) => {
    navigate(`/buy_b2c?id=${id}`);
  };

  // **Extract Unique Subcategories**
  const uniqueSubcategories = [
    ...new Set(products.map((item) => item.subcategory || item.category)),
  ];

  // **Filtering and Sorting Logic**
  let filteredProducts = products;

  if (shopCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (item) => item.subcategory === shopCategory
    );
  }

  if (selectedSort === "price_low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (selectedSort === "price_high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (selectedSort === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="shopping-product">
      <h1>{selectedCategory} - B2C Products</h1>

      {/* Subcategory Filter */}
      {uniqueSubcategories.length > 0 && (
        <div className="filter-section">
          <label>Subcategory: </label>
          <select value={shopCategory} onChange={(e) => setShopCategory(e.target.value)}>
            <option value="all">All</option>
            {uniqueSubcategories.map((subcategory, index) => (
              <option key={index} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Sorting Dropdown */}
      <div className="filter-section">
        <label>Sort By: </label>
        <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Display Products */}
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.images[0] || "/fallback-image.jpg"}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                />
                <h2>{product.name}</h2>
                <p>{product.description || "No description available."}</p>
                <p>Price: ₹{product.price}</p>
                <p>Rating: {product.rating || "N/A"} / 5</p>
                <button onClick={() => handleCategoryClick(product._id)}>
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ShoppingProduct;
