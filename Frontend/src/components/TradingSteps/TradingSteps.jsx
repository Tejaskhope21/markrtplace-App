import React from "react";
import "./TradingSteps.css";

const TradingSteps = () => {
  const steps = [
    {
      id: 1,
      icon: "fa-th-large", // Font Awesome icon class
      title: "Millions of business offerings",
      description:
        "Explore products and suppliers for your business from millions of offerings worldwide.",
    },
    {
      id: 2,
      icon: "fa-check-circle",
      title: "Assured quality and transactions",
      description:
        "Ensure production quality from verified suppliers, with your orders protected from payment to delivery.",
    },
    {
      id: 3,
      icon: "fa-sync-alt",
      title: "One-stop trading solution",
      description:
        "Order seamlessly from product/supplier search to order management, payment, and fulfillment.",
    },
    {
      id: 4,
      icon: "fa-tools",
      title: "Tailored trading experience",
      description:
        "Get curated benefits, such as exclusive discounts, enhanced protection, and extra support, to help grow your business every step of the way.",
    },
  ];

  return (
    <div className="trading-steps-container">
      {steps.map((step) => (
        <div key={step.id} className="step-card">
          <div className="step-icon">
            <i className={`fas ${step.icon}`}></i>
          </div>
          <h3 className="step-title">{step.title}</h3>
          <p className="step-description">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TradingSteps;
