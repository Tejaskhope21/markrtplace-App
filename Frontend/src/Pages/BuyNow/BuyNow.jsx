import React, { useState } from "react";
import "./BuyNow.css";
import { item_list } from "../../assets/data"; // Adjust the import path as needed
import { useLocation } from "react-router-dom";

function BuyNow() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track the main image index

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("id");
  const productId = Number(selectedCategory) || 0;

  // Find the product based on productId
  const product = item_list.find((item) => item.id === productId);

  // Handle thumbnail click to update the main image
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  if (!product) {
    return (
      <div className="no-product">
        <p>No product found with ID: {selectedCategory || "Not specified"}</p>
      </div>
    );
  }

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
          </p>
          <p className="moq">MOQ: {product.MOQ} pieces</p>

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
            <button className="send-inquiry"onClick={()=>{}}>Buy Now</button>
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