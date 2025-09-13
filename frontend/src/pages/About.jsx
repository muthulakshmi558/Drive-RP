// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import AboutUs from "../components/About";
import MissionSection from "../components/MissionSection";
import ApproachSection from "../components/ApproachSection";

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <AboutUs />
      <MissionSection />
      <ApproachSection />
      <Footer />

    </div>
  );
}
