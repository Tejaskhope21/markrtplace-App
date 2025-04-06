import React, { useContext, useState, useEffect } from "react";
import "./B2CCart.css";
import { StoreContext } from "../../components/context/StoreProvider";
import axios from "axios";

function B2CCart() {
  const { cartitem = {}, removeFromcart, isLoading } = useContext(StoreContext);
  const [cartItems, setCartItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [error, setError] = useState(null);

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

        const response = await axios.get("http://localhost:5000/api/itemsb2c", {
          params: { ids: itemIds.join(",") },
        });

        console.log("Fetched cart items:", response.data);
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
      const item = cartItems.find((item) => item._id === itemId);
      if (item && cartitem[itemId]?.quantity > 0) {
        total += (item.price || 0) * cartitem[itemId].quantity;
      }
    }
    return total.toFixed(2);
  };

  if (isLoading || loadingItems) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="placeorder">
      <h1>Your B2B Cart</h1>
      {Object.keys(cartitem).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {Object.keys(cartitem).map((itemId) => {
            const product = cartItems.find((item) => item._id === itemId);
            if (!product || cartitem[itemId].quantity === 0) return null;

            return (
              <div key={itemId} className="cart-item">
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name || "Product"}
                />
                <div>
                  <h2>{product.name || "Unnamed Product"}</h2>
                  <p>Price: ₹{(product.price || 0).toFixed(2)}</p>
                  <p>Quantity: {cartitem[itemId].quantity}</p>
                  <p>
                    Total: ₹
                    {(product.price * cartitem[itemId].quantity).toFixed(2)}
                  </p>
                </div>
                <button onClick={() => removeFromcart(itemId)}>Remove</button>
              </div>
            );
          })}
        </div>
      )}

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Items: {Object.keys(cartitem).length}</p>
        <p>Total Amount: ₹{calculateTotalAmount()}</p>
        <button onClick={() => console.log("Proceed to B2B Checkout")}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default B2CCart;
