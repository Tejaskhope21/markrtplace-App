import React, { useContext, useState, useEffect } from "react";
import "./B2BCart.css";
import { StoreContext } from "../../components/context/StoreProvider";
import axios from "axios";

function B2BCart() {
  const { cartitem = {}, removeFromcart, isLoading } = useContext(StoreContext);
  const [cartItems, setCartItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [error, setError] = useState(null);
  const defaultImage = "/default-product-image.png"; // Ensure this image is available in your public folder

  useEffect(() => {
    const fetchCartItems = async () => {
      if (Object.keys(cartitem).length === 0) {
        setCartItems([]);
        return;
      }

      setLoadingItems(true);
      setError(null);

      try {
        const itemIds = Object.keys(cartitem).filter(
          (itemId) => cartitem[itemId]?.quantity > 0
        );

        if (itemIds.length === 0) {
          setCartItems([]);
          setLoadingItems(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/items", {
          params: { ids: itemIds.join(",") },
        });

        setCartItems(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError(err.response?.data?.message || "Failed to load cart items.");
      } finally {
        setLoadingItems(false);
      }
    };

    fetchCartItems();
  }, [cartitem]);

  const calculateTotalAmount = () => {
    let total = 0;
    for (const itemId in cartitem) {
      if (cartitem[itemId]?.quantity > 0) {
        total += parseFloat(cartitem[itemId].totalPrice || 0);
      }
    }
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  if (isLoading || loadingItems) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="placeorder">
        <div className="placeorder-content">
          <h1>Your Cart</h1>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="placeorder">
      <div className="placeorder-content">
        <h1>Your Cart</h1>
        {Object.keys(cartitem).length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <a href="/products">Continue Shopping</a>
          </div>
        ) : (
          <div className="cart-items">
            {Object.keys(cartitem).map((itemId) => {
              const product = (Array.isArray(cartItems) ? cartItems : []).find(
                (item) => item._id === itemId
              );
              if (!product || cartitem[itemId].quantity === 0) return null;

              return (
                <div key={itemId} className="cart-item">
                  <div className="item-image">
                    <img
                      src={`http://localhost:5000/uploads/${product.images?.[0]}` }
                      alt={product.name || "Product Image"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h2>{product.name}</h2>
                    {product.price_per_piece ? (
                      <p>
                        Price: ₹
                        {Object.values(product.price_per_piece)[0]?.toFixed(
                          2
                        ) || "N/A"}{" "}
                        per piece
                      </p>
                    ) : (
                      <p>Price: ₹{product.price?.toFixed(2) || "N/A"}</p>
                    )}
                    <p>Quantity: {cartitem[itemId].quantity}</p>
                    <p>Total: ₹{cartitem[itemId].totalPrice}</p>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to remove ${product.name} from your cart?`
                        )
                      ) {
                        removeFromcart(itemId);
                      }
                    }}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <p>Total Items: {Object.keys(cartitem).length}</p>
          <p>Total Amount: ₹{calculateTotalAmount()}</p>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default B2BCart;
