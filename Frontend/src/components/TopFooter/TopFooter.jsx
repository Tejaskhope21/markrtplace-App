import React from 'react';
import './TopFooter.css';
import img from '../../assets/imageData';

function TopFooter() {
  return (
    <div className='topfooter'>
      <div className="topfooter-content">
        <div className="topfooter-heading">
          <h1>Top Brands across all</h1>
          <h1>categories</h1>
        </div>
        <div className="topfooter-brand-img">
          {img.map((item) => (
            <img key={item.id} src={item.src} alt={`Logo ${item.id}`} className="brand-logo" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopFooter;