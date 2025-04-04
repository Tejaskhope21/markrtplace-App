import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreProvider"; // Adjust path as needed

function Login({ setShowLogin }) {
  const { setSelectedOption } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login submitted:", { email, password });
    setShowLogin(false);
    setSelectedOption(null);
    navigate("/");
  };

  const handleClose = () => {
    setShowLogin(false);
    setSelectedOption(null);
    navigate("/");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <button
        className="back"
        onClick={handleClose}
        style={{ cursor: "pointer", border: "none", background: "none" }}
      >
        X
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;