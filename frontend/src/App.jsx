// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BuyBike from "./pages/BuyBike";
import BikePage from "./pages/BikeDetailsPage";
import SellbikePage from "./pages/SellBike";
import PaymentPage from "./pages/Payment";
import LoginPage from "./pages/LoginPage";

// Component to handle page title change
const TitleHandler = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Map of paths to titles
    const titles = {
      "/": "Home | Drive RP",
      "/about": "About Us | Drive RP",
      "/contact": "Contact | Drive RP",
      "/buy-bike": "Buy Bikes | Drive RP",
      "/sell-bike": "Sell Your Bike | Drive RP",
      "/login": "Login | Drive RP",
      "/payment": "Payment | Drive RP",
    };

    // Dynamic title for bike details page
    if (location.pathname.startsWith("/bikes/")) {
      document.title = "Bike Details | Drive RP";
    } else {
      document.title = titles[location.pathname] || "Drive RP";
    }
  }, [location]);

  return children;
};

function App() {
  return (
    <Router>
      <TitleHandler>
        <div className="App font-['Roboto']">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/buy-bike" element={<BuyBike />} />
            <Route path="/bikes/:id" element={<BikePage />} />
            <Route path="/sell-bike" element={<SellbikePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </div>
      </TitleHandler>
    </Router>
  );
}

export default App;
