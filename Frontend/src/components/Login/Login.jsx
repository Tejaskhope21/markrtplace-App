import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreProvider";
import "./Login.css";
import axios from "axios";

function Login({ setShowLogin }) {
  const { setToken, setSelectedOption } = useContext(StoreContext);

  const [currstate, setCurrstate] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  // Reset input fields when the popup opens
  useEffect(() => {
    setData({ name: "", email: "", password: "" });
  }, [setShowLogin]);

  // Handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let newUrl =
      currstate === "Login"
        ? `http://localhost:5000/api/user/login`
        : `http://localhost:5000/api/user/register`;

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success && response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        // Call handleClose to reset fields, close popup, and navigate
        handleClose();
      } else {
        alert(response.data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  // Close popup & reset fields
  const handleClose = () => {
    setData({ name: "", email: "", password: "" });
    setShowLogin(false);
    setSelectedOption(null);
    navigate("/");
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h1>{currstate}</h1>
          <h1 onClick={handleClose} alt="Close">
            X
          </h1>
        </div>

        <div className="login-popup-inputs">
          {currstate !== "Login" && (
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              name="name"
              required
            />
          )}
          <input
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            name="email"
            required
            autoComplete="off"
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            name="password"
            required
            autoComplete="new-password"
          />
        </div>

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