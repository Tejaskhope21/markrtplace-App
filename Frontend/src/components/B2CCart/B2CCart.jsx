import React, { useContext } from "react";
import "./B2CCart.css";
import { StoreContext } from "../../components/context/StoreProvider";
import { Link } from "react-router-dom";

function B2CCart() {
  const {
    cartitem = {},
    b2c_items = [],
    removeFromcart,
    isLoading,
  } = useContext(StoreContext);

  const calculateTotalAmount = () => {
    let total = 0;
    for (const itemId in cartitem) {
      if (cartitem[itemId]?.quantity > 0) {
        const product = b2c_items.find((item) => item.id === Number(itemId));
        if (product) {
          total += cartitem[itemId].totalPrice;
        }
      }
    }
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    console.log("Proceeding to B2C checkout with:", cartitem);
    // Add checkout logic here
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="b2c-cart">
      <div className="b2c-cart-content">
        <h1>Your B2C Cart</h1>
        {Object.keys(cartitem).length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/b2c-products">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-items">
            {Object.keys(cartitem).map((itemId) => {
              const product = b2c_items.find(
                (item) => item.id === Number(itemId)
              );
              if (!product || cartitem[itemId].quantity <= 0) return null;

              return (
                <div key={itemId} className="cart-item">
                  <div className="item-image">
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/150"
                      }
                      alt={product.name || "Product Image"}
                    />
                  </div>
                  <div className="item-details">
                    <h2>{product.name || "Unnamed Product"}</h2>
                    <p>Price: ₹{product.price?.toFixed(2) || "N/A"}</p>
                    <p>Quantity: {cartitem[itemId].quantity}</p>
                    <p>Total: ₹{cartitem[itemId].totalPrice.toFixed(2)}</p>
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
          <p>
            Total Items:{" "}
            {
              Object.keys(cartitem).filter(
                (itemId) => cartitem[itemId].quantity > 0
              ).length
            }
          </p>
          <p>Total Amount: ₹{calculateTotalAmount()}</p>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={Object.keys(cartitem).length === 0}
          >
            Proceed to B2C Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default B2CCart;
