import React from "react";
import "./Hero.css";
import HeroImage from "../../assets/Header_img.jpg";
function Hero() {
  return (
    <div className="hero">
      <img src={HeroImage} alt="Hero" />
      <div className="hero-container">
        <p>eB2B platform for business and shop-woner</p>
        <div className="hero-serch">
          <input type="text" />
          <button>Serch</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
