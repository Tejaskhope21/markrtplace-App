import React, { useState } from "react";
import "./Buy_B2C.css";
import { useLocation } from "react-router-dom";
import { productcategory } from "../../assets/b_to_c_data";

function Buy_B2C() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track the main image index
  const [quantity, setQuantity] = useState(1); // State to track the quantity of the product

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("id");
  const productId = Number(selectedCategory) || 0;

  // Find the product based on productId
  const product = productcategory.find((item) => item.id === productId);

  // Handle thumbnail click to update the main image
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = Math.max(
      product.MOQ || 1,
      Math.min(1000, Number(e.target.value))
    );
    setQuantity(value);
  };

  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    return (product.price * quantity).toFixed(2);
  };

  // Handle place order
  const handlePlaceOrder = () => {
    const totalPrice = calculateTotalPrice();
    const orderDetails = {
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      totalPrice: totalPrice,
    };
    console.log("Placing order:", orderDetails);
    // Add your order placement logic here (e.g., API call, add to cart, etc.)
    alert(`Order placed successfully! Total: $${totalPrice}`);
  };

  if (!product) {
    return (
      <div className="no-product">
        <p>No product found with ID: {selectedCategory || "Not specified"}</p>
      </div>
    );
  }

  return (
    <div className="buy-b2c-container">
      <div className="buy-b2c-content">
        {/* Left Section: Images */}
        <div className="buy-b2c-images">
          <div className="thumbnail-gallery">
            {product.images &&
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name || "Product"} - View ${index + 1}`}
                  className={`thumbnail ${
                    selectedImageIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
          </div>
          <div className="main-image-container">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[selectedImageIndex]}
                alt={`${product.name || "Product"} - Main`}
                className="main-image"
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="buy-b2c-details">
          <h1 className="buy-b2c-title">{product.name || "Unnamed Product"}</h1>
          <div className="supplier-info">
            <span className="supplier-name">{product.supplier?.name}</span>
            <span className="location">{product.supplier?.location}</span>
          </div>
          <p className="reviews">No reviews yet</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="moq">MOQ: {product.MOQ} pieces</p>

          {/* Quantity Input Section */}
          <div className="quantity-section">
            <h3>Quantity</h3>
            <input
              type="number"
              min={product.MOQ || 1}
              max="1000"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
            <p className="total-price">Total: ${calculateTotalPrice()}</p>
          </div>

          <div className="specifications">
            <h3>Specifications</h3>
            {product.specifications && (
              <ul>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.replace("_", " ").toUpperCase()}:</strong>{" "}
                    {Array.isArray(value) ? value.join(", ") : value}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="shipping-info">
            <h3>Shipping</h3>
            <p>
              {product.shipping?.free_shipping_above
                ? `Free shipping above $${product.shipping.free_shipping_above}`
                : `Shipping cost: $${product.shipping?.cost || 0}`}
            </p>
          </div>

          <div className="actions">
            <button className="send-inquiry">Send inquiry</button>
            <button className="place-order" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>

          <div className="protections">
            <h3>Protections for this product</h3>
            <p>✔ Secure payments</p>
            <p>
              Every payment you make on this site is secured with strict SSL
              encryption and PCI DSS data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy_B2C;
