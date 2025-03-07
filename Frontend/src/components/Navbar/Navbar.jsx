import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
function Navbar({ setShowLogin }) {
  // Correct prop name
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when a link is clicked (only in mobile view)
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  // Change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link className="link" to="/">
          MarketSetu
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <Link className="link" to="/seller" onClick={handleLinkClick}>
          Seller
        </Link>
        <Link className="link" to="/bulkproducts" onClick={handleLinkClick}>
          Bulk products
        </Link>
        <Link className="link" to="/shopping" onClick={handleLinkClick}>
          Shopping
        </Link>
        {/* <Link className="link" to="/cart" onClick={handleLinkClick}>
          <img src="" alt="" />
        </Link> */}
        <div className="link" to="/signin">
          <button className="sign" onClick={() => setShowLogin(true)}>
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
