import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const [products, setProducts] = useState([]); // Store products from backend
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");

  // ✅ Fetch products from backend when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!selectedCategory) {
          throw new Error("No category selected");
        }

        const response = await axios.get(
          `http://localhost:5000/api/products?category=${encodeURIComponent(
            selectedCategory
          )}`
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Refetch when category changes

  const handleCardClick = (id) => {
    navigate(`/buy?id=${id}`);
  };

  const handleButtonClick = (e, id) => {
    e.stopPropagation();
    console.log(`Buy button clicked for product ID: ${id}`);
  };

  const uniqueSubcategories = [
    ...new Set(products.map((item) => item.product_category)),
  ];

  const filteredProducts = products.filter(
    (item) =>
      selectedSubcategory === "all" ||
      item.product_category === selectedSubcategory
  );

  return (
    <div className="products-container">
      <h1 className="products-title">{selectedCategory} Products</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
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
                key={product._id} // Use _id from MongoDB
                className="product-card"
                onClick={() => handleCardClick(product._id)}
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
                    Supplier: {product.supplier.name},{" "}
                    {product.supplier.location}
                  </p>
                  <button
                    id="buy-btn"
                    onClick={(e) => handleButtonClick(e, product._id)}
                  >
                    Buy Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
