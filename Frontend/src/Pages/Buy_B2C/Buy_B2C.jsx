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

  console.log("Product ID from URL:", productId); // Debug log

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          throw new Error("No product ID specified in URL");
        }

        console.log(
          "Fetching product from:",
          `http://localhost:5000/api/itemsb2c/${productId}`
        ); // Debug: Log the exact URL

        const response = await axios.get(
          `http://localhost:5000/api/itemsb2c/${productId}`
        );
        console.log("Fetched product data:", response.data); // Debug: Log the response

        if (!response.data) {
          throw new Error("No product data returned from server");
        }

        // Adjust image paths if they are stored as objects (similar to BuyNow)
        const adjustedProduct = {
          ...response.data,
          images:
            response.data.images?.map((img) =>
              typeof img === "object" && img.path ? img.path : img
            ) || [],
        };

        setProduct(adjustedProduct);
        setQuantity(adjustedProduct.MOQ || 1); // Initialize quantity to MOQ
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleThumbnailClick = (index) => setSelectedImageIndex(index);

  const getPricePerPiece = () => {
    if (!product) return 0;
    if (typeof product.price === "number") {
      return product.price;
    }
    if (
      product.price_per_piece &&
      typeof product.price_per_piece === "object"
    ) {
      const priceRanges = Object.values(product.price_per_piece)
        .map(Number)
        .filter((n) => !isNaN(n));
      return priceRanges.length > 0 ? priceRanges[0] : 0;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const pricePerPiece = getPricePerPiece();
    return pricePerPiece !== 0 && quantity !== ""
      ? (pricePerPiece * Number(quantity)).toFixed(2)
      : "0.00";
  };

  const handleQuantityChange = (e) => {
    const minQuantity = product?.MOQ || 1;
    let value =
      e.target.value === ""
        ? ""
        : Math.max(minQuantity, Math.min(1000, Number(e.target.value)));
    setQuantity(value);
  };

  const handleBuyNow = () => {
    const totalPrice = calculateTotalPrice();
    if (quantity && totalPrice > 0) {
      addToCart(product._id, Number(quantity), Number(totalPrice));
    } else {
      console.warn("Invalid quantity or total price:", {
        quantity,
        totalPrice,
      });
    }
  };

  if (!productId) {
    return (
      <div className="no-product">
        <p>Please provide a product ID in the URL (e.g., ?id=123).</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="no-product">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="no-product">
        <p>
          {error || `No product found with ID: ${productId || "Not specified"}`}
        </p>
      </div>
    );
  }

  const defaultImage = "https://via.placeholder.com/300";

  return (
    <div className="buynow-container">
      <div className="buynow-content">
        {/* Left Section: Images */}
        <div className="buynow-images">
          <div className="thumbnail-gallery">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img || defaultImage}
                alt={`${product?.name || "Product"} - View ${index + 1}`}
                className={`thumbnail ${
                  selectedImageIndex === index ? "active" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
                onError={(e) => {
                  console.error(`Failed to load thumbnail: ${img}`);
                  e.target.src = "https://via.placeholder.com/50";
                }}
              />
            ))}
          </div>
          <div className="main-image-container">
            {product?.images?.length > 0 ? (
              <img
                src={product.images[selectedImageIndex] || defaultImage}
                alt={`${product?.name || "Product"} - Main`}
                className="main-image"
                onError={(e) => {
                  console.error(
                    `Failed to load main image: ${product.images[selectedImageIndex]}`
                  );
                  e.target.src = defaultImage;
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
            <span className="supplier-name">
              {product?.supplier?.name || "Unknown Supplier"}
            </span>
            <span className="location">
              {product?.supplier?.location || "Unknown Location"}
            </span>
          </div>
          <p className="reviews">No reviews yet</p>

          <p className="price">
            ₹
            {getPricePerPiece() !== undefined
              ? getPricePerPiece().toFixed(2)
              : "N/A"}
            <span> per piece</span>
          </p>
          <p className="moq">MOQ: {product?.MOQ || 1} pieces</p>
          <p className="description">
            {product?.description || "No description available."}
          </p>

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

          {product?.specifications && (
            <div className="specifications">
              <h3>Specifications</h3>
              <ul>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.replace("_", " ").toUpperCase()}:</strong>{" "}
                    {Array.isArray(value) ? value.join(", ") : value}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
              <button
                className="send-inquiry"
                onClick={() => removeFromcart(product._id)}
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

export default Buy_B2C;
