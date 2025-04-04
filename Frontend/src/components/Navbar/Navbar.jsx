import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { TiShoppingCart } from "react-icons/ti";
import { useContext } from "react";
import { StoreContext } from "../context/StoreProvider";

function Navbar({ setShowLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { setSelectedOption, selectedOption } = useContext(StoreContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignInClick = () => {
    setShowLogin(true);
    if (selectedOption === "user") {
      navigate("/login");
    } else if (selectedOption === "admin") {
      navigate("/productadmin"); // Navigate to /productadmin
    } else {
      navigate("/register"); // Default to /register to show selection screen
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link className="link" to="/">
          <span className="M-class">M</span>arket
          <span className="M-class">S</span>etu
        </Link>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <Link className="link" to="/placeorder" onClick={handleLinkClick}>
          <TiShoppingCart />
        </Link>
        <button className="sign" onClick={handleSignInClick}>
          Sign in
        </button>
      </div>
    </nav>
  );
}

export default Navbar;