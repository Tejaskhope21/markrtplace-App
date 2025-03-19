import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="logo">
        <Link className="link" to="/">
          <span className="M-class">M</span>arket
          <span className="M-class">S</span>etu
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <Link className="link" to="/add">
          Add
        </Link>
        <Link className="link" to="/list">
          List
        </Link>
        <Link className="link" to="/admin">
          Admin
        </Link>
      </div>

     

    
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;