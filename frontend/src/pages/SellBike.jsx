// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import CalculatorSection from "../components/CalculatorSection";
import Footer from "../components/Footer";
import HowItWorksSection from "../components/HowItWorksSection";
import SellBanner from "../components/SellbikeBanner";


export default function SellbikePage() {
  return (
    <div>
      <Navbar />
      <SellBanner />
      <CalculatorSection />
      <HowItWorksSection />
      <Footer />

    </div>
  );
}
