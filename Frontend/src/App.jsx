import Navbar from "../src/components/Navbar/Navbar";
import Footer from "../src/components/Footer/Footer";
import Home from "../src/Pages/Home/Home";
import "./App.css";
import { useState } from "react";
import Login from "../src/components/Login/Login";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD

=======
import Cart from "./Pages/Cart/Cart";
>>>>>>> b1677f2e3fc1f7b7f389cc6c95a54770f2c14b85
function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div id="root">
      {showLogin ? <Login /> : null}
      <Navbar setShowLogin={setShowLogin} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
=======
          <Route path="/cart"  element={<Cart/>}/>
>>>>>>> b1677f2e3fc1f7b7f389cc6c95a54770f2c14b85
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
