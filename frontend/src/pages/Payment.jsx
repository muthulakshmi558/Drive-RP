// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import PaymentComponent from "../components/Payment";

export default function PaymentPage() {
  return (
    <div>
      <Navbar />
      <PaymentComponent />
      <Footer />

    </div>
  );
}
