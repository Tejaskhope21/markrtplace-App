import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setShowLogin }) {
  const [currstate, setCurrstate] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

const handleClose=() => {
    setShowLogin(false);
    navigate("/"); // Redirect to home when closing the login modal
  }
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <form action="">
        <h1>{currstate}</h1>
        <h2 className="back " onClick={handleClose}>---</h2>
        {currstate !== "Login" && (
          <input
            type="text"
            placeholder="Your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        )}
        
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        
        <button type="submit" className="login-btn">
          {currstate === "Signup" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>

          {currstate === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrstate("Signup")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrstate("Login")}>Login here</span>
            </p>
          )}
         
        </div>
      </form>
    </div>
  );
}

export default Login;
