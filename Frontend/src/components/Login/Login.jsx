import React, { useState } from "react";
import "./Login.css";


function Login({ setShowLogin }) {
  const [currstate, setCurrstate] = useState("Login");

  const handle = () => {
    setShowLogin(false);
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-pupup-title">
          <h1>{currstate}</h1>
          <p onClick={handle}  >X</p>
        </div>

        <div className="login-popup-inputs">
          {currstate === "Signup" && (
            <input type="text" placeholder="Your name" required />
          )}
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
        </div>

        <button className="login-btn">
          {currstate === "Signup" ? "Create Account" : "Login"}
        </button>

        <div className="login-poup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>

          {currstate === "Login" ? (
            <p>
              Create a new account?
              <span onClick={() => setCurrstate("Signup")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setCurrstate("Login")}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;