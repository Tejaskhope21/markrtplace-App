import React from 'react';
import './Footer.css';

function App() {
  return (
    <div id="root">
      {/* Main content */}
      <div className="main-content">
        {/* <h1>Welcome to MarketSetu</h1>
        <p>This is the main content of the page.</p> */}
      </div>

      {/* Footer */}
      <footer className="footer-container">
        <div className="footer__logo">
          <img src="/logo.png" alt="Logo" width="50" height="50" />
          <p>MarketSetu</p>
          <div>
            <img src="/apple.png" alt="App Store" width="30" height="30" />
            <img src="/playstore.png" alt="Google Play" width="30" height="30" />
          </div>
        </div>

        <div className="footer__links">
          <ul>
            <li><a href="#">Help</a></li>
            <li><a href="#">Sell on Udaan</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">News Room</a></li>
          </ul>
        </div>

        <div className="footer__links">
          <ul>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Returns Policy</a></li>
            <li><a href="#">Product Listing Policy</a></li>
            <li><a href="#">IP Infringement Policy</a></li>
          </ul>
        </div>

        <div className="footer__links">
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;