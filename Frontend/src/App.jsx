import Navbar from "../src/components/Navbar/Navbar";
import Footer from "../src/components/Footer/Footer";
import Home from "../src/Pages/Home/Home";
import "./App.css";
import { useState } from "react";
import Login from "../src/components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Products from "./Pages/Products/Products";

import Cart from "./Pages/Cart/Cart";
import ShoppingProduct from "./Pages/ShoppingProduct/ShoppingProduct";
import BuyNow from "./Pages/BuyNow/BuyNow";
function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login /> : null}

      <div className="main-content">
      <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shop" element={<ShoppingProduct />} />
          <Route path="/buy" element={<BuyNow />} />
        </Routes>
      <Footer />
      </div>

    </>
  );
}

export default App;
// div id="root"div