// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import BikeListing from "../components/BikeListing";

export default function BuyBike() {
  return (
    <div>
      <Navbar />
      <BikeListing />
      <Footer />

    </div>
  );
}
