import React from 'react';
import './UpperFooter'

function UpperFooter() {
  return (
    <div className="app">
      {/* Upper Section */}
      <div className="upper-section">
        <h1>Download udaan app now!</h1>
        <p>Khole Munsfe Ka Shatter</p>
        <button className="register-button">Register →</button>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-content">
          <p>rrm for business and</p>
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperFooter;