// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import LoginRegister from "../components/LoginRegister";


export default function LoginPage() {
  return (
    <div>
      <Navbar />
      <LoginRegister />
      <Footer />

    </div>
  );
}
