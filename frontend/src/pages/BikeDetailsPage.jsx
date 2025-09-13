// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import BikeDetails from "../components/BikeDetails";
import BikeOverview from "../components/BikeOverview";
import BookingSteps from "../components/BookingSteps";


export default function BikePage() {
  return (
    <div>
      <Navbar />
      <BikeDetails />
      <BikeOverview />
      <BookingSteps />
      <Footer />

    </div>
  );
}
