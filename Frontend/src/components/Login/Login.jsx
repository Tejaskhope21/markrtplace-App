import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreProvider";
import axios from "axios";
import "./Login.css";

function Login({ setShowLogin }) {
  const { setToken, setSelectedOption } = useContext(StoreContext);

  const [currstate, setCurrstate] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    setData({ name: "", email: "", password: "" });
  }, [setShowLogin]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const newUrl =
      currstate === "Login"
        ? `http://localhost:5000/api/user/login`
        : `http://localhost:5000/api/user/register`;

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success && response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        handleClose();
      } else {
        alert(response.data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const handleClose = () => {
    setData({ name: "", email: "", password: "" });
    setShowLogin(false);
    setSelectedOption(null);
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="decor-left"></div>
      <div className="decor-right"></div>
      <button type="button" onClick={handleClose} className="close-button">
        ×
      </button>
      <div className="login-header">
        <h2 className="login-title">WELCOME</h2>
        <p className="login-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <form onSubmit={onSubmitHandler}>
        {currstate !== "Login" && (
          <div>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="login-input"
            />
          </div>
        )}

        <div>
          <input
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            name="email"
            placeholder="Username"
            required
            autoComplete="off"
            className="login-input"
          />
        </div>

        <div>
          <input
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="new-password"
            className="login-input"
          />
        </div>

        <button type="submit" className="submit-button">
          {currstate === "Signup" ? "Create Account" : "LOGIN"}
        </button>

        <div className="terms-checkbox">
          <label className="terms-text">
            <input type="checkbox" required />
            Remember
          </label>
          <span className="terms-text">
            <a href="#" className="toggle-link">
              Forgot Password?
            </a>
          </span>
        </div>

        <p className="terms-text">
          {currstate === "Login" ? (
            <>
              Create a new account?{" "}
              <span
                onClick={() => setCurrstate("Signup")}
                className="toggle-link"
              >
                Create Account
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrstate("Login")}
                className="toggle-link"
              >
                Login here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default Login;
