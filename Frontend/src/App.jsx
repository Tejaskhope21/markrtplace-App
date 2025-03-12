import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar";
import Footer from "../src/components/Footer/Footer";
import Home from "../src/Pages/Home/Home";
import Login from "../src/components/Login/Login";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import ShoppingProduct from "./Pages/ShoppingProduct/ShoppingProduct";
import BuyNow from "./Pages/BuyNow/BuyNow";
import Buy_B2C from "./Pages/Buy_B2C/Buy_B2C";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Register from "./Pages/Register/Register";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showLogin) {
      navigate("/register"); // Navigate to the /register route
    }
  }, [showLogin, navigate]);

  return (
    <>
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
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
