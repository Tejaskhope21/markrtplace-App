import Navbar from "../src/components/Navbar/Navbar";
import Footer from "../src/components/Footer/Footer";
import Home from "../src/Pages/Home/Home";
import "./App.css";
import { useState } from "react";
import Login from "../src/components/Login/Login";
import { Routes, Route } from "react-router-dom";
import ProductDisplay from "./Pages/ProductDisplay/ProductDisplay";
import Buynow from "./components/Buynow/Buynow";
import Fabric from "./Pages/Fabric/Fabric";
import IndustrialMaterial from "./Pages/IndustrialMaterial/IndustrialMaterial";
function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div id="root">
      {showLogin ? <Login /> : null}
      <Navbar setShowLogin={setShowLogin} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/productdisplay" element={<ProductDisplay />} />
          <Route path="/seller" element={<Buynow />} />

          <Route path="/fabric" element={<Fabric />} />
          <Route path="/industrialmaterial" element={<IndustrialMaterial />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
