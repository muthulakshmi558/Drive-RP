import React from "react";
import {
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaMapMarkerAlt,
  FaGlobe,
  FaPhoneAlt,
} from "react-icons/fa";
import logo from "../assets/images/footer_logo.png"; // replace with your DriveRP logo image
import bike from "../assets/images/footer_bike.png"; // replace with your white bike image

export default function Footer() {
  return (
    <footer className="bg-[#07435C] text-white font-roboto px-8 py-10 relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start relative">
        
        {/* Logo + Social */}
        <div>
          <img src={logo} alt="DriveRP Logo" className="h-14 w-auto" />
          <p className="mt-4 font-medium">Get in touch</p>
          <div className="flex gap-4 mt-3 text-2xl">
            <a href="#" className="text-[#25D366]">
              <FaWhatsapp />
            </a>
            <a href="#" className="text-[#FF0000]">
              <FaYoutube />
            </a>
            <a href="#" className="text-[#E1306C]">
              <FaInstagram />
            </a>
            <a href="#" className="text-[#1877F2]">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <ul className="space-y-3">
            <li className="hover:text-[#00E5FF] cursor-pointer">Home</li>
            <li className="hover:text-[#00E5FF] cursor-pointer">About Us</li>
            <li className="hover:text-[#00E5FF] cursor-pointer">Contact Us</li>
            <li className="hover:text-[#00E5FF] cursor-pointer">Buy Bike</li>
            <li className="hover:text-[#00E5FF] cursor-pointer">Sell Bike</li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-2 text-left relative z-10 pr-10 md:pr-20">
          <ul className="space-y-2">
            <li>Electric Two-Wheelers</li>
            <li>Motorcycles</li>
            <li>Scooters</li>
            <li>Mopeds</li>
            <li>ATV</li>
            <li>Custom Bikes</li>
          </ul>
        </div>

        {/* Address */}
        <div className="space-y-3 relative z-10">
          <p className="font-semibold">Address:</p>
          <p className="flex items-start gap-4">
            <FaMapMarkerAlt className="mt-1" /> 51, Rajaji Street, <br />
            GST Road, Chengalpattu-603104
          </p>
          <p className="flex items-center gap-4">
            <FaGlobe /> www.DriveRp.in
          </p>
          <p className="flex items-center gap-4">
            <FaPhoneAlt /> +91 987 952 1234
          </p>
        </div>
      </div>

      {/* Bike Image Positioned between 3rd and 4th column */}
      <img
        src={bike}
        alt="Bike"
        className="absolute right-52 top-1/2 transform -translate-y-1/2 w-48 opacity-95"
      />
    </footer>
  );
}
