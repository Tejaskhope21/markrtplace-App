import React from "react";
import Hero from "../../components/Hero/Hero";
import Category from "../../components/Category/Category";
import TopFooter from "../../components/TopFooter/TopFooter";
import TradingSteps from "../../components/TradingSteps/TradingSteps";
import B2C_Category from "../../components/B2C_Category/B2C_Category";
import "./Home.css"; // Import CSS for styling

function Home() {
  return (
    <div>
      <Hero />
      <div className="section">
        <Category />
      </div>
      <div className="separator"></div> {/* Separator between sections */}
      <div className="section">
        <B2C_Category />
      </div>
      <TradingSteps />
      <TopFooter />
    </div>
  );
}
export default Home;
