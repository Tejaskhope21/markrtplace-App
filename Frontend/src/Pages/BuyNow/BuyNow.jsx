import React, { useContext, useState } from "react";
import "./BuyNow.css";
import { item_list } from "../../assets/data"; // Adjust the import path as needed
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../components/context/StoreProvider";

function BuyNow() {
  const { cartitem, addToCart, removeFromcart } = useContext(StoreContext);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(""); // Changed from 1 to "" (empty string)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("id");
  const productId = Number(selectedCategory) || 0;

  const product = item_list.find((item) => item.id === productId);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value =
      e.target.value === ""
        ? ""
        : Math.max(product.MOQ || 1, Math.min(1000, Number(e.target.value)));
    setQuantity(value);
  };

  if (!product) {
    return (
      <div className="no-product">
        <p>No product found with ID: {selectedCategory || "Not specified"}</p>
      </div>
    );
  }

  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    const pricePerPiece =
      product.price_per_piece && product.price_per_piece["50-499"]
        ? product.price_per_piece["50-499"]
        : 0;
    // Only calculate if quantity is a valid number
    return quantity !== ""
      ? (pricePerPiece * Number(quantity)).toFixed(2)
      : "0.00";
  };

  const handleBuyNow = () => {
    const totalPrice = calculateTotalPrice();
    addToCart(productId, Number(quantity), Number(totalPrice));
  };

  return (
    <div className="buynow-container">
      <div className="buynow-content">
        {/* Left Section: Images */}
        <div className="buynow-images">
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
        <div className="buynow-details">
          <h1 className="buynow-title">{product.name || "Unnamed Product"}</h1>
          <div className="supplier-info">
            <span className="supplier-name">{product.supplier.name}</span>
            <span className="location">{product.supplier.location}</span>
          </div>
          <p className="reviews">No reviews yet</p>
          <p className="price">
            ₹
            {product.price_per_piece && product.price_per_piece["50-499"]
              ? product.price_per_piece["50-499"].toFixed(2)
              : "N/A"}
            <span> per piece</span>
          </p>
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
              placeholder={`Min: ${product.MOQ || 1}`} // Optional: adds placeholder
            />
            <p className="total-price">Total: ₹{calculateTotalPrice()}</p>
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
            {product.dimensions && (
              <ul>
                <li>
                  <strong>DIMENSIONS:</strong> {product.dimensions.join(", ")}
                </li>
              </ul>
            )}
            {product.thickness && (
              <ul>
                <li>
                  <strong>THICKNESS:</strong> {product.thickness.join(", ")}
                </li>
              </ul>
            )}
            {product.colors && (
              <ul>
                <li>
                  <strong>COLORS:</strong> {product.colors.join(", ")}
                </li>
              </ul>
            )}
            {product.sizes && (
              <ul>
                <li>
                  <strong>SIZES:</strong> {product.sizes.join(", ")}
                </li>
              </ul>
            )}
          </div>

          <div className="shipping-info">
            <h3>Shipping</h3>
            <p>
              {product.shipping.free_shipping_above
                ? `Free shipping above ₹${product.shipping.free_shipping_above}`
                : `Shipping cost: ₹${product.shipping.cost || 0}`}
            </p>
          </div>

          <div className="actions">
            <button className="send-inquiry">Send inquiry</button>
            {!cartitem[productId] ? (
              <button className="send-inquiry" onClick={handleBuyNow}>
                Buy Now
              </button>
            ) : (
              <button
                className="send-inquiry"
                onClick={() => removeFromcart(productId)}
              >
                Cancel
              </button>
            )}
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

export default BuyNow;