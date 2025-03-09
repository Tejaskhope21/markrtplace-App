import React from "react";
import Hero from "../../components/Hero/Hero";
import Category from "../../components/Category/Category";
import TopFooter from "../../components/TopFooter/TopFooter";
import TradingSteps from "../../components/TradingSteps/TradingSteps";
import B2C_Category from "../../components/B2C_Category/B2C_Category";

function Home() {
  return (
    <div>
      <Hero />
      <Category />
      <B2C_Category />
      <TopFooter />
      <TradingSteps />
      <TopFooter />
    </div>
  );
}
export default Home;
