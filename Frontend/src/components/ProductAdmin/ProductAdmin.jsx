
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ProductAdmin.css"; 



  
function ProductAdmin({ setShowLogin }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [category, setCategory] = useState("");
  const [shopName, setShopName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mobileNumber || !otp || !category || !shopName || !businessType || !pincode) {
      alert("Please fill in all fields.");
      return;
    }

    if (otp !== "123456") {
      alert("Invalid OTP. Please enter 123456 for this demo.");
      return;
    }

    const shopDetails = { mobileNumber, category, shopName, businessType, pincode };
    console.log("Shop Registered:", shopDetails);
    alert("Shop registration successful!");

    setShowLogin(false); // Close login form
    navigate("/"); // Redirect to home page
  };

  const handleClose = () => {
    setShowLogin(false);
    navigate("/"); // Redirect to home when closing the login modal
  };
  return (
    <>
    
    <div className="shop-registration">
      <h1>Shop Registration</h1>
      <h3 className="back" onClick={handleClose} style={{ cursor: "pointer" }}>X</h3>
      <form onSubmit={handleSubmit} className="registration-form">
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input
          type="tel"
          id="mobileNumber"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number"
          required
        />

        <label htmlFor="otp">OTP</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP (use 123456 for demo)"
          required
        />
        

        <label htmlFor="category">Select Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="B2B">B2B</option>
          <option value="B2C">B2C</option>
        </select>

        <label htmlFor="shopName">Shop Name</label>
        <input
          type="text"
          id="shopName"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Enter shop name"
          required
        />

        <label htmlFor="businessType">Business Type</label>
        <input
          type="text"
          id="businessType"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder="Enter business type"
          required
        />

        <label htmlFor="pincode">Pincode</label>
        <input
          type="text"
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter pincode"
          required
        />

        <button type="submit">Register Shop</button>
      </form>
    </div>
  );
    </>
  )
}

export default ProductAdmin
