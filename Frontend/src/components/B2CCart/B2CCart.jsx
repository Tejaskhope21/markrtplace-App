// import React, { useContext } from "react";
// import "./B2CCart.css";
// import { StoreContext } from "../../components/context/StoreProvider";
// import { Link } from "react-router-dom";

// function B2CCart() {
//   const {
//     cartitem = {},
//     b2c_items = [],
//     removeFromcart,
//     isLoading,
//   } = useContext(StoreContext);

//   const calculateTotalAmount = () => {
//     let total = 0;
//     for (const itemId in cartitem) {
//       if (cartitem[itemId]?.quantity > 0) {
//         const product = b2c_items.find((item) => item.id === Number(itemId));
//         if (product) {
//           total += cartitem[itemId].totalPrice;
//         }
//       }
//     }
//     return total.toFixed(2);
//   };

//   const handleCheckout = () => {
//     console.log("Proceeding to B2C checkout with:", cartitem);
//     // Add checkout logic here
//   };

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="b2c-cart">
//       <div className="b2c-cart-content">
//         <h1>Your B2C Cart</h1>
//         {Object.keys(cartitem).length === 0 ? (
//           <div className="empty-cart">
//             <p>Your cart is empty.</p>
//             <Link to="/b2c-products">Continue Shopping</Link>
//           </div>
//         ) : (
//           <div className="cart-items">
//             {Object.keys(cartitem).map((itemId) => {
//               const product = b2c_items.find(
//                 (item) => item.id === Number(itemId)
//               );
//               if (!product || cartitem[itemId].quantity <= 0) return null;

//               return (
//                 <div key={itemId} className="cart-item">
//                   <div className="item-image">
//                     <img
//                       src={
//                         product.images?.[0] || "https://via.placeholder.com/150"
//                       }
//                       alt={product.name || "Product Image"}
//                     />
//                   </div>
//                   <div className="item-details">
//                     <h2>{product.name || "Unnamed Product"}</h2>
//                     <p>Price: ₹{product.price?.toFixed(2) || "N/A"}</p>
//                     <p>Quantity: {cartitem[itemId].quantity}</p>
//                     <p>Total: ₹{cartitem[itemId].totalPrice.toFixed(2)}</p>
//                   </div>
//                   <button
//                     className="remove-button"
//                     onClick={() => {
//                       if (
//                         window.confirm(
//                           `Are you sure you want to remove ${product.name} from your cart?`
//                         )
//                       ) {
//                         removeFromcart(itemId);
//                       }
//                     }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <div className="cart-summary">
//           <h2>Cart Summary</h2>
//           <p>
//             Total Items:{" "}
//             {
//               Object.keys(cartitem).filter(
//                 (itemId) => cartitem[itemId].quantity > 0
//               ).length
//             }
//           </p>
//           <p>Total Amount: ₹{calculateTotalAmount()}</p>
//           <button
//             className="checkout-button"
//             onClick={handleCheckout}
//             disabled={Object.keys(cartitem).length === 0}
//           >
//             Proceed to B2C Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default B2CCart;
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
        <p>Total Amount: ₹{calculateTotalAmount()}</p>
        <button onClick={() => console.log("Proceed to B2B Checkout")}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default B2CCart;
