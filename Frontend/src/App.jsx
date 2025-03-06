import Navbar from "../src/components/Navbar/Navbar";
import Footer from "../src/components/Footer/Footer";
import Home from "../src/Pages/Home/Home";
import "./App.css";
import { useState } from "react";
import Login from "../src/components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Cart from "./Pages/Cart/Cart";
function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div id="root">
      {showLogin ? <Login /> : null}
      <Navbar setShowLogin={setShowLogin} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart"  element={<Cart/>}/>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
