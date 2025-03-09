import React from "react";
import Hero from "../../components/Hero/Hero";
import Category from "../../components/Category/Category";
import TopFooter from "../../components/TopFooter/TopFooter";
import TradingSteps from "../../components/TradingSteps/TradingSteps";

function Home() {
  return (
    <div>
      <Hero />
      <Category />
      <TopFooter />
      <TradingSteps />
    </div>
  );
}
export default Home;
