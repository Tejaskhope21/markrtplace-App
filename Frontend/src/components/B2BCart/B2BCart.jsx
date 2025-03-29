import React, { useContext, useState, useEffect } from "react";
import "./B2BCart.css";
import { StoreContext } from "../../components/context/StoreProvider";
import axios from "axios";

function B2BCart() {
  const { cartitem ={}, removeFromcart, isLoading } = useContext(StoreContext);
  const [cartItems, setCartItems] = useState([]); // State to store fetched items
  const [loadingItems, setLoadingItems] = useState(false); // Loading state for fetching items
  const [error, setError] = useState(null); // Error state for fetching items

  // Fetch cart items from the backend based on cartitem IDs
  useEffect(() => {
    const fetchCartItems = async () => {
      if (Object.keys(cartitem).length === 0) {
        setCartItems([]);
        return;
      }

      setLoadingItems(true);
      setError(null);

      try {
        // Get the list of item IDs from cartitem
        const itemIds = Object.keys(cartitem).filter(
          (itemId) => cartitem[itemId]?.quantity > 0
        );

        if (itemIds.length === 0) {
          setCartItems([]);
          setLoadingItems(false);
          return;
        }

        // Fetch all items in a single request (assuming the backend supports this)
        const response = await axios.get("http://localhost:5000/api/items", {
          params: {
            ids: itemIds.join(","), // Send item IDs as a comma-separated string
          },
        });

        console.log("Fetched cart items:", response.data);
        setCartItems(response.data);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError(err.response?.data?.message || "Failed to load cart items.");
      } finally {
        setLoadingItems(false);
      }
    };

    fetchCartItems();
  }, [cartitem]); // Re-fetch when cartitem changes

  // Calculate total amount
  const calculateTotalAmount = () => {
    let total = 0;
    for (const itemId in cartitem) {
      if (cartitem[itemId]?.quantity > 0) {
        total += parseFloat(cartitem[itemId].totalPrice || 0);
      }
    }
    return total.toFixed(2);
  };

  // Handle checkout
  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    // Implement your checkout logic here
  };

  if (isLoading || loadingItems) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="placeorder">
        <div className="placeorder-content">
          <h1>Your Cart</h1>
          <p>{error}</p>
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
              // Find the product in the fetched cart items
              const product = cartItems.find((item) => item._id === itemId);
              if (!product || cartitem[itemId].quantity === 0) return null;

              return (
                <div key={itemId} className="cart-item">
                  <div className="item-image">
                    <img
                      src={`${product.images?.[0]} || https://via.placeholder.com/150`}
                      alt={product.name || "Product Image"}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h2>{product.name}</h2>
                    {/* Display price based on product type */}
                    {product.price_per_piece ? (
                      <p>
                        Price: ₹
                        {Object.values(product.price_per_piece)[0]?.toFixed(2) || "N/A"} per piece
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
                      if (window.confirm(`Are you sure you want to remove ${product.name} from your cart?`)) {
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