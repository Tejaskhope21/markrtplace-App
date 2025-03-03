import React from "react";
import "./Footer.css"; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            <li>
              <a href="#">Sell on Udsan</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">News Room</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Regulatory</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Policies</h4>
          <ul>
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">IP Infringement Policy</a>
            </li>
            <li>
              <a href="#">Anti Counterfeiting Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Other Policies</h4>
          <ul>
            <li>
              <a href="#">Udsan Coin Policy</a>
            </li>
            <li>
              <a href="#">Returns Policy</a>
            </li>
            <li>
              <a href="#">Product Listing Policy</a>
            </li>
            <li>
              <a href="#">Undelivered Shipment (RTO) Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Udsan. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
