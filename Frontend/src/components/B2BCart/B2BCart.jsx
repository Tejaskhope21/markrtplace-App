import React, { useContext } from "react";
import "./B2BCart.css"; // Ensure you have this CSS file
import { StoreContext } from "../../components/context/StoreProvider";

function B2BCart() {
  const { cartitem = {}, item_list = [], removeFromcart, isLoading } = useContext(StoreContext);

  // Calculate total amount
  const calculateTotalAmount = () => {
    let total = 0;
    for (const itemId in cartitem) {
      if (cartitem[itemId]?.quantity > 0) {
        // Find the product in the B2B item list
        const product = item_list.find((item) => item.id === Number(itemId));
        if (product) {
          total += parseFloat(cartitem[itemId].totalPrice || 0);
        }
      }
    }
    return total.toFixed(2);
  };

  // Handle checkout
  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log("Proceeding to checkout...");
  };

  if (isLoading) {
    return <p>Loading...</p>;
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
              // Find the product in the B2B item list
              const product = item_list.find((item) => item.id === Number(itemId));
              if (!product || cartitem[itemId].quantity === 0) return null;

              return (
                <div key={itemId} className="cart-item">
                  <div className="item-image">
                    <img
                      src={product.images?.[0] || "https://via.placeholder.com/150"}
                      alt={product.name || "Product Image"}
                    />
                  </div>
                  <div className="item-details">
                    <h2>{product.name}</h2>
                    {/* Display price based on product type */}
                    {product.price_per_piece ? (
                      <p>
                        Price: ₹
                        {product.price_per_piece["50-499"]?.toFixed(2) || "N/A"} per piece
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
