import React, { useContext, useState } from "react";
import "./BuyNow.css";
import { item_list } from "../../assets/data"; // Adjust the import path as needed
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../components/context/StoreProvider";

function BuyNow() {
  const { cartitem, addToCart, removeFromcart } = useContext(StoreContext);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(""); // Changed from 1 to ""

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("id");
  const productId = Number(selectedCategory) || 0;

  const product = item_list.find((item) => item.id === productId);

  // Debugging (check the console to see if the product data is coming correctly)
  console.log("Product Data:", product);
  console.log("Price Per Piece:", product?.price_per_piece);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value =
      e.target.value === ""
        ? ""
        : Math.max(product?.MOQ || 1, Math.min(1000, Number(e.target.value)));
    setQuantity(value);
  };

  if (!product) {
    return (
      <div className="no-product">
        <p>No product found with ID: {selectedCategory || "Not specified"}</p>
      </div>
    );
  }

  // ✅ Try fetching price from available ranges
  const getPricePerPiece = () => {
    return (
      product?.price_per_piece?.["50-499"] ??
      product?.price_per_piece?.["1-49"] ??
      product?.price_per_piece?.["500+"] ??
      undefined
    );
  };

  // ✅ Calculate total price based on quantity
  const calculateTotalPrice = () => {
    const pricePerPiece = getPricePerPiece();
    if (pricePerPiece !== undefined && quantity !== "") {
      return (pricePerPiece * Number(quantity)).toFixed(2);
    }
    return "0.00";
  };

  const handleBuyNow = () => {
    const totalPrice = calculateTotalPrice();
    if (quantity && totalPrice > 0) {
      addToCart(productId, Number(quantity), Number(totalPrice));
    }
  };

  return (
    <div className="buynow-container">
      <div className="buynow-content">
        {/* Left Section: Images */}
        <div className="buynow-images">
          <div className="thumbnail-gallery">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product?.name || "Product"} - View ${index + 1}`}
                className={`thumbnail ${
                  selectedImageIndex === index ? "active" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
          <div className="main-image-container">
            {product?.images?.length > 0 ? (
              <img
                src={product.images[selectedImageIndex]}
                alt={`${product?.name || "Product"} - Main`}
                className="main-image"
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="buynow-details">
          <h1 className="buynow-title">{product?.name || "Unnamed Product"}</h1>
          <div className="supplier-info">
            <span className="supplier-name">
              {product?.supplier?.name || "Unknown Supplier"}
            </span>
            <span className="location">
              {product?.supplier?.location || "Unknown Location"}
            </span>
          </div>
          <p className="reviews">No reviews yet</p>

          {/* ✅ Fixed Price Display */}
          <p className="price">
            ₹
            {getPricePerPiece() !== undefined
              ? getPricePerPiece().toFixed(2)
              : "N/A"}
            <span> per piece</span>
          </p>
          <p className="moq">MOQ: {product?.MOQ || 1} pieces</p>

          {/* Quantity Input Section */}
          <div className="quantity-section">
            <h3>Quantity</h3>
            <input
              type="number"
              min={product?.MOQ || 1}
              max="1000"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
              placeholder={`Min: ${product?.MOQ || 1}`}
            />
            <p className="total-price">Total: ₹{calculateTotalPrice()}</p>
          </div>

          {/* Specifications */}
          <div className="specifications">
            <h3>Specifications</h3>
            {product?.specifications && (
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

          {/* Shipping Info */}
          <div className="shipping-info">
            <h3>Shipping</h3>
            <p>
              {product?.shipping?.free_shipping_above
                ? `Free shipping above ₹${product.shipping.free_shipping_above}`
                : `Shipping cost: ₹${product?.shipping?.cost || 0}`}
            </p>
          </div>

          {/* Actions */}
          <div className="actions">
            <button className="send-inquiry">Send Inquiry</button>
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

          {/* Protections */}
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
