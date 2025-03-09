import { motion } from "framer-motion";
import { useState } from "react";
import "./TradingSteps.css";

const steps = [
  {
    id: 1,
    title: "Create an Account",
    description:
      "Register using your mobile number. Enter your Name, Shop name, and Pincode.",
    image: "https://pixlr.com/images/generator/text-to-image.webp", // Make sure this image exists in the public/icons folder
  },
  {
    id: 2,
    title: "Complete Shop KYC",
    description:
      "Upload any one of the shop's KYC documents like GSTIN, Shop & Establishment License.",
    image: "/icons/check-circle.png", // Ensure this exists in the public/icons folder
  },
  {
    id: 3,
    title: "Start Ordering",
    description:
      "Browse and order products for your shop from top sellers & brands.",
    image: "/icons/shopping-cart.png", // Ensure this exists in the public/icons folder
  },
];

const TradingSteps = () => {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="container">
      <h2 className="title">Start Trading in 3 Simple Steps</h2>
      <div className="steps-container">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className={`step-card ${activeStep === step.id ? "active" : ""}`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveStep(step.id)}
          >
            <div className="card-content">
              <img src={step.image} alt={step.title} className="icon-image" />
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <button className="register-button">Register</button>
    </div>
  );
};

export default TradingSteps;
