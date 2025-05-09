import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../components/context/StoreProvider";
import "./Buy_B2C.css";

function Buy_B2C() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");

  const { addToCart } = useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0); // State to track active thumbnail

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:5000/api/itemsb2c/${productId}`
        );

        if (response.data.data) {
          setProduct(response.data.data);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleBuyNow = () => {
    if (product) {
      const unitPrice = Number(product.price);
      const totalPrice = unitPrice * Number(quantity);
      if (quantity > 0 && totalPrice > 0) {
        addToCart(product._id, Number(quantity), unitPrice);
        alert(`${quantity} ${product.name} added to cart!`);
      } else {
        alert("Invalid quantity or price. Please try again.");
      }
    }
  };

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index); // Update the active image index when thumbnail is clicked
  };

  if (loading)
    return (
      <div className="buy-b2c">
        <p>Loading product details...</p>
      </div>
    );
  if (error)
    return (
      <div className="buy-b2c">
        <p className="error">{error}</p>
      </div>
    );
  if (!product)
    return (
      <div className="buy-b2c">
        <p>No product found.</p>
      </div>
    );

  return (
    <div className="buy-b2c">
      <div className="product-details">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="thumbnail-gallery">
            {product.images &&
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={`thumbnail ${
                    index === activeImageIndex ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                />
              ))}
          </div>
          <div className="main-image-container">
            {product.images && product.images.length > 0 ? (
              <img
                src={`http://localhost:5000/uploads/${product.images[activeImageIndex]}`}
                alt={product.name}
                className="main-image"
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
              />
            ) : (
              <img
                src="/fallback-image.jpg"
                alt="No image available"
                className="main-image"
              />
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="description">
            {product.description || "No description available."}
          </p>
          <p className="price">Price: ₹{product.price}</p>
          <p className="rating">Rating: {product.rating || "N/A"} / 5</p>
          <p className="category">Category: {product.category}</p>
          {product.subcategory && (
            <p className="subcategory">Subcategory: {product.subcategory}</p>
          )}

          {/* Quantity Selector */}
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>

          <p className="total-price">
            Total: ₹{(product.price * quantity).toFixed(2)}
          </p>

          <div className="actions">
            <button className="buy-button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy_B2C;
