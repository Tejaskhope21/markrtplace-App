import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import ShoppingProduct from "./Pages/ShoppingProduct/ShoppingProduct";
import BuyNow from "./Pages/BuyNow/BuyNow";
import Buy_B2C from "./Pages/Buy_B2C/Buy_B2C";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Register from "./Pages/Register/Register";
import Login from "./components/Login/Login";
import StoreProvider from "./components/context/StoreProvider"; 
import ProductAdmin from "./components/ProductAdmin/ProductAdmin";

import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <StoreProvider>
      <div className="main-content">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shop" element={<ShoppingProduct />} />
          <Route path="/buy" element={<BuyNow />} />
          <Route path="/buy_b2c" element={<Buy_B2C />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/login" element={<Login setShowLogin={setShowLogin} />} />
          <Route path="/productadmin" element={<ProductAdmin setShowLogin={setShowLogin} />} />
          <Route path="/register" element={<Register setShowLogin={setShowLogin} />} />
        </Routes>
        <Footer />
      </div>
    </StoreProvider>
  );
}

export default App;