import React, { useState } from "react";
import Login from "../../components/Login/Login";
import ProductAdmin from "../../components/ProductAdmin/ProductAdmin";
import "./Register.css"; // Assuming you have a CSS file for styling

function Register({ setShowLogin }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="register-container">
      {!selectedOption && (
           <div className="register-container">
           <button className="back-button" onClick={() => navigate("/")}>⬅ Back</button>
           <h1 className="register-title">Select an Option</h1>
           <div className="option-container">
             <div className="option-box" onClick={() => setSelectedOption("user")}>User Login</div>
             <div className="option-box" onClick={() => setSelectedOption("admin")}>Register as Shop Admin</div>
           </div>
         </div>
      )}
      
      {selectedOption === "user" && <Login setShowLogin={setShowLogin} />}
      {selectedOption === "admin" && <ProductAdmin setShowLogin={setShowLogin} />}
    </div>
  );
}

export default Register;
