import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { endpoints } from "../api/api";

const BikeOverview = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const res = await API.get(`${endpoints.bikes}${id}/`);
        setBike(res.data);
      } catch (error) {
        console.error("Error fetching bike:", error);
      }
    };
    fetchBike();
  }, [id]);

  if (!bike) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white border rounded-xl shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#07435C] animate-bounce">
        🚴 Bike Overview
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Bike Brand", value: bike.brand },
          { label: "Bike Model", value: bike.title },
          { label: "Variant", value: `${bike.engine_cc} CC` },
          { label: "Make Year", value: bike.year },
          { label: "Refurbished", value: "Yes" },
          { label: "Kilometers", value: `${bike.km_driven} Km` },
          { label: "Owners", value: bike.owner },
          { label: "Fuel Type", value: bike.fuel_type },
          { label: "Transmission", value: "Auto" },
          { label: "RC Available", value: "Yes" },
          { label: "Insurance", value: "Yes" },
          { label: "Finance", value: "No" },
          { label: "Warranty", value: "No" },
          { label: "Location", value: bike.location },
          { label: "Price", value: `₹ ${bike.price}` },
          { label: "Booking Status", value: bike.is_booked ? "Booked" : "Available" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="border p-4 rounded-lg shadow-md bg-gray-50 hover:shadow-xl transition duration-300"
          >
            <p className="text-sm font-semibold text-black">{item.label}</p>
            <p className="text-md font-bold text-[#07435C] mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeOverview;
