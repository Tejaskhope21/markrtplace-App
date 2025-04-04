import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Buy_B2C.css"; // You'll need to create this CSS file

function Buy_B2C() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
    // Add your purchase logic here
    console.log(`Buying ${quantity} of ${product?.name}`);
    // You might want to redirect to a checkout page or show a confirmation
  };

  if (loading) {
    return <div className="buy-b2c"><p>Loading product details...</p></div>;
  }

  if (error) {
    return (
      <div className="buy-b2c">
        <p className="error">{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!product) {
    return <div className="buy-b2c"><p>No product found.</p></div>;
  }

  return (
    <div className="buy-b2c">
      <h1>{product.name}</h1>
      
      <div className="product-details">
        <div className="product-images">
          {product.images && product.images.length > 0 ? (
            <img
              src={`http://localhost:5000/uploads/${product.images[0]}`}
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

        <div className="product-info">
          <p className="description">{product.description || "No description available."}</p>
          <p className="price">Price: ₹{product.price}</p>
          <p className="rating">Rating: {product.rating || "N/A"} / 5</p>
          <p className="category">Category: {product.category}</p>
          {product.subcategory && (
            <p className="subcategory">Subcategory: {product.subcategory}</p>
          )}
          
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

          <button className="buy-button" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buy_B2C;