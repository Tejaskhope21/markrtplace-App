import React, { useState } from "react";
import "./Login.css"; // Ensure you have this CSS file

function Login() {
  const [step, setStep] = useState(1); // Step 1: Mobile Number, Step 2: OTP, Step 3: Category Selection, Step 4: Registration Form
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [category, setCategory] = useState(""); // B2B or B2C
  const [shopName, setShopName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [pincode, setPincode] = useState("");

  // Handle mobile number submission
  const handleMobileSubmit = (e) => {
    e.preventDefault();
    // Simulate OTP generation and send to the user
    console.log("OTP sent to:", mobileNumber);
    setStep(2); // Move to OTP verification step
  };

  // Handle OTP verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Simulate OTP verification
    if (otp === "123456") {
      // Replace with actual OTP verification logic
      console.log("OTP verified");
      setStep(3); // Move to category selection step
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // Handle category selection
  const handleCategorySelect = (e) => {
    e.preventDefault();
    if (category) {
      setStep(4); // Move to registration form step
    } else {
      alert("Please select a category.");
    }
  };

  // Handle shop registration form submission
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // Simulate registration logic
    const shopDetails = {
      mobileNumber,
      category,
      shopName,
      businessType,
      pincode,
    };
    console.log("Shop Registered:", shopDetails);
    alert("Shop registration successful!");
    // Reset the form
    setStep(1);
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
      {step === 1 && (
        <form onSubmit={handleMobileSubmit} className="registration-form">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your mobile number"
            required
          />
          <button type="submit">Get OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit} className="registration-form">
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleCategorySelect} className="registration-form">
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
          <button type="submit">Next</button>
        </form>
      )}

      {step === 4 && (
        <form onSubmit={handleRegistrationSubmit} className="registration-form">
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
      )}
    </div>
  );
}

export default Login;