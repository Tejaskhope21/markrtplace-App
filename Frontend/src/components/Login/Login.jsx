import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Assuming the CSS file is still named Login.css

function Register() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [category, setCategory] = useState("");
  const [shopName, setShopName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!mobileNumber || !otp || !category || !shopName || !businessType || !pincode) {
      alert("Please fill in all fields.");
      return;
    }

    // Mock OTP verification (replace with actual logic if needed)
    if (otp !== "123456") {
      alert("Invalid OTP. Please enter 123456 for this demo.");
      return;
    }

    // Collect all data
    const shopDetails = {
      mobileNumber,
      otp, // Optional: You might not need to include OTP in the final data
      category,
      shopName,
      businessType,
      pincode,
    };

    console.log("Shop Registered:", shopDetails);
    alert("Shop registration successful!");

    // Navigate to home page after successful registration
    navigate("/");

    // Reset the form (optional)
    setMobileNumber("");
    setOtp("");
    setCategory("");
    setShopName("");
    setBusinessType("");
    setPincode("");
  };

  return (
    <div className="shop-registration">
      <h1>Shop Registration</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Mobile Number */}
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input
          type="tel"
          id="mobileNumber"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number"
          required
        />

        {/* OTP */}
        <label htmlFor="otp">OTP</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP (use 123456 for demo)"
          required
        />

        {/* Category */}
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

        {/* Shop Name */}
        <label htmlFor="shopName">Shop Name</label>
        <input
          type="text"
          id="shopName"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Enter shop name"
          required
        />

        {/* Business Type */}
        <label htmlFor="businessType">Business Type</label>
        <input
          type="text"
          id="businessType"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder="Enter business type"
          required
        />

        {/* Pincode */}
        <label htmlFor="pincode">Pincode</label>
        <input
          type="text"
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter pincode"
          required
        />

        {/* Submit Button */}
        <button type="submit">Register Shop</button>
      </form>
    </div>
  );
}

export default Register;