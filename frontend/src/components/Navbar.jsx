// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // 👈 added useNavigate
import { FiSearch } from "react-icons/fi";

const logoPath = "./src/assets/images/logo.png";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="w-full shadow-md bg-white font-['Roboto']">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logoPath} alt="DriveRP Logo" className="h-14 w-auto" />
          </Link>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-8 text-[#07435C] font-medium">
          <li>
            <Link to="/" className="hover:text-teal-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/buy-bike" className="hover:text-teal-500">
              Buy Bike
            </Link>
          </li>
          <li>
            <Link to="/sell-bike" className="hover:text-teal-500">
              Sell Bike
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-teal-500">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-teal-500">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-[#07435C] font-medium">
                Hi, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#FFAB0D] text-[#07435C] px-5 py-2 rounded-full font-medium hover:bg-[#FFD166] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-[#07435C] text-white px-5 py-2 rounded-full hover:bg-[#05506f] transition">
                Login
              </button>
            </Link>
          )}
          <FiSearch className="text-[#07435C] text-xl cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}
