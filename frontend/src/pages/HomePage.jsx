// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import HomeBanner from "../components/Banner";
import InfoSection from "../components/InfoSection";
import SupportSection from "../components/SupportSection";
import FeaturedBikes from "../components/FeaturedBikes";
import FeaturesBox from "../components/FeaturesBox";
import TestimonialSection from "../components/TestimonialSection";
import RiderStory from "../components/RiderStory";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HomeBanner />
      <InfoSection />
      <SupportSection />
      <FeaturedBikes />
      <FeaturesBox />
      <TestimonialSection />
      <RiderStory />
      <FAQ />
      <Footer />

    </div>
  );
}
