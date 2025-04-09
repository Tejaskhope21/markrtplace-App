import React from "react";
import "./PlaceOrder.css"; // Ensure you have this CSS file
import StoreContext from "../../components/context/StoreProvider"; // Adjust the import path as needed
// import B2CCart from "../../components/B2CCart/B2CCart"; // Corrected import
import B2BCart from "../../components/B2BCart/B2BCart"; // Corrected import

function PlaceOrder() {
  return (
    <div className="place-order-container">
      <h1>Place Order</h1>
      <div className="cart-sections">
        <div className="b2b-cart-section">
          <h2>B2B Cart</h2>
          <B2BCart />
        </div>
        {/* <div className="b2c-cart-section">
          <h2>B2C Cart</h2>
          <B2CCart />
        </div> */}
      </div>
    </div>
  );
}

export default PlaceOrder;