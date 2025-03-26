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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:5000/api/productsb2c?category=${selectedCategory}`
        );

        setProducts(response.data.data || []);
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

  // Get unique subcategories (if any)
  const uniqueSubcategories = [
    ...new Set(products.map((item) => item.subcategory || item.category)),
  ];

  // Filter products based on the selected subcategory
  const filteredProducts = products.filter(
    (item) => shopCategory === "all" || item.subcategory === shopCategory
  );

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="shopping-product">
      <h1>Products in {selectedCategory}</h1>

      {/* Subcategory Filter */}
      <div className="subcategory-filter">
        <button onClick={() => setShopCategory("all")}>All</button>
        {uniqueSubcategories.map((subcategory, index) => (
          <button key={index} onClick={() => setShopCategory(subcategory)}>
            {subcategory}
          </button>
        ))}
      </div>

      {/* Display Filtered Products */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.images[0]}
                alt={product.name}
                className="product-image"
                onError={(e) => (e.target.src = "/fallback-image.jpg")} // Handle broken images
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ₹{product.price}</p>
              <p>Rating: {product.rating} / 5</p>
              <button onClick={() => handleCategoryClick(product._id)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default ShoppingProduct;
