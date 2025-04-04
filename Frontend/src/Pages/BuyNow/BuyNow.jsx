import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../components/context/StoreProvider";
import "./BuyNow.css";

function BuyNow() {
  const { cartitem, addToCart, removeFromcart } = useContext(StoreContext);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) throw new Error("No product ID specified in URL");

        const response = await axios.get(
          `http://localhost:5000/api/items/${productId}`
        );
        if (!response.data) throw new Error("No product data found");

        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleThumbnailClick = (index) => setSelectedImageIndex(index);

  const handleQuantityChange = (e) => {
    const value =
      e.target.value === ""
        ? ""
        : Math.max(product?.MOQ || 1, Math.min(1000, Number(e.target.value)));
    setQuantity(value);
  };

  if (loading)
    return (
      <div className="no-product">
        <p>Loading...</p>
      </div>
    );

  if (error || !product)
    return (
      <div className="no-product">
        <p>{error || "Product not found"}</p>
      </div>
    );

  const getPricePerPiece = () => {
    if (
      !product?.price_per_piece ||
      typeof product.price_per_piece !== "object"
    )
      return product?.price ?? undefined;
    return Object.values(product.price_per_piece)[0] || product?.price;
  };

  const calculateTotalPrice = () => {
    const pricePerPiece = getPricePerPiece();
    return pricePerPiece && quantity !== ""
      ? (pricePerPiece * Number(quantity)).toFixed(2)
      : "0.00";
  };

  const handleBuyNow = () => {
    const totalPrice = calculateTotalPrice();
    if (quantity && totalPrice > 0) {
      addToCart(product._id, Number(quantity), Number(totalPrice));
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
                src={
                  img.startsWith("http")
                    ? img
                    : `http://localhost:5000/uploads/${img}`
                }
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${
                  selectedImageIndex === index ? "active" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
              />
            ))}
          </div>
          <div className="main-image-container">
            {product?.images?.length > 0 ? (
              <img
                src={
                  product.images[selectedImageIndex].startsWith("http")
                    ? product.images[selectedImageIndex]
                    : `http://localhost:5000/uploads/${product.images[selectedImageIndex]}`
                }
                alt={`Main product`}
                className="main-image"
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
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

          <p className="price">
            ₹{getPricePerPiece()?.toFixed(2) || "N/A"}
            <span> per piece</span>
          </p>
          <p className="moq">MOQ: {product?.MOQ || 1} pieces</p>

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

          <div className="shipping-info">
            <h3>Shipping</h3>
            <p>
              {product?.shipping?.free_shipping_above
                ? `Free shipping above ₹${product.shipping.free_shipping_above}`
                : `Shipping cost: ₹${product?.shipping?.cost || 0}`}
            </p>
          </div>

          <div className="actions">
            <button className="send-inquiry">Send Inquiry</button>
            {!cartitem[product._id] ? (
              <button className="buy-button" onClick={handleBuyNow}>
                Buy Now
              </button>
            ) : (
              <button
                className="cancel-button"
                onClick={() => removeFromcart(product._id)}
              >
                Cancel
              </button>
            )}
          </div>

          <div className="protections">
            <h3>Buyer Protections</h3>
            <p>✔ Secure payments</p>
            <p>All transactions are encrypted with SSL & PCI DSS standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;
