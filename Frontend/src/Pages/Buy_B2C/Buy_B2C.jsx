import React, { useContext, useState, useEffect } from "react";
import "./Buy_B2C.css";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../components/context/StoreProvider";
import axios from "axios";

function Buy_B2C() {
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
    
        const response = await axios.get(`http://localhost:5000/api/itemsb2c/${productId}`);
    
        if (response.status !== 200 || !response.data) {
          throw new Error("Product data is missing or invalid.");
        }
    
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
   

    fetchProduct();
  }, [productId]);

  const handleThumbnailClick = (index) => setSelectedImageIndex(index);

  const getPricePerPiece = () => {
    if (!product) return undefined;

    if (typeof product.price === "number") {
      return product.price;
    }

    if (product.price_per_piece && typeof product.price_per_piece === "object") {
      const priceRanges = Object.values(product.price_per_piece);
      return priceRanges.length > 0 ? Number(priceRanges[0]) : undefined;
    }

    return undefined;
  };

  const calculateTotalPrice = () => {
    const pricePerPiece = getPricePerPiece();
    return pricePerPiece !== undefined && quantity !== "" ? (pricePerPiece * Number(quantity)).toFixed(2) : "0.00";
  };

  const handleQuantityChange = (e) => {
    const minQuantity = product?.MOQ || 1;
    let value = e.target.value === "" ? "" : Math.max(minQuantity, Math.min(1000, Number(e.target.value)));
    setQuantity(value);
  };

  const handleBuyNow = () => {
    const totalPrice = calculateTotalPrice();
    if (quantity && totalPrice > 0) {
      addToCart(product._id, Number(quantity), Number(totalPrice));
    } else {
      console.warn("Invalid quantity or total price:", { quantity, totalPrice });
    }
  };

  if (loading) return <div className="no-product"><p>Loading...</p></div>;

  if (error || !product) {
    return (
      <div className="no-product">
        <p>{error || `No product found with ID: ${productId || "Not specified"}`}</p>
      </div>
    );
  }

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
                className={`thumbnail ${selectedImageIndex === index ? "active" : ""}`}
                onClick={() => handleThumbnailClick(index)}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/50";
                }}
              />
            ))}
          </div>
          <div className="main-image-container">
            {product?.images?.length > 0 ? (
              <img
                src={product.images[selectedImageIndex]}
                alt={`${product?.name || "Product"} - Main`}
                className="main-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300";
                }}
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
            <span className="supplier-name">{product?.supplier?.name || "Unknown Supplier"}</span>
            <span className="location">{product?.supplier?.location || "Unknown Location"}</span>
          </div>
          <p className="reviews">No reviews yet</p>

          <p className="price">
            ₹{getPricePerPiece() !== undefined ? getPricePerPiece().toFixed(2) : "N/A"} per piece
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
              <button className="send-inquiry" onClick={handleBuyNow}>
                Buy Now
              </button>
            ) : (
              <button className="send-inquiry" onClick={() => removeFromcart(product._id)}>
                Cancel
              </button>
            )}
          </div>

          <div className="protections">
            <h3>Protections for this product</h3>
            <p>✔ Secure payments</p>
            <p>
              Every payment you make on this site is secured with strict SSL encryption and PCI DSS data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy_B2C;
