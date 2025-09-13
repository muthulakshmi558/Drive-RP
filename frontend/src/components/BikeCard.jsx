import React from "react";
import { Link } from "react-router-dom";

const BikeCard = ({ bike }) => {
  return (
    <div className="border rounded-xl bg-white shadow-md hover:shadow-lg transition p-4">
      <Link to={`/bikes/${bike.id}`}>
        {/* Image + Booked Badge */}
        <div className="relative">
          {bike.is_booked && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-md shadow">
              Booked
            </span>
          )}
          <img
            src={`http://127.0.0.1:8000/media/${bike.image}`}
            alt={bike.title}
            className="w-full h-44 object-cover rounded-lg"
          />
        </div>

        {/* Bike Details */}
        <div className="mt-3">
          <h3 className="font-semibold text-base text-gray-900">{bike.title}</h3>

          <p className="text-gray-600 text-sm mt-1">
            {bike.km_driven} Km · {bike.fuel_type} · {bike.owner}
          </p>

          <p className="text-xl font-bold text-[#07435C] mt-2">
            ₹ {bike.price.toLocaleString("en-IN")}
          </p>

          <p className="text-gray-500 text-sm mt-1">📍 {bike.location}</p>
        </div>
      </Link>
    </div>
  );
};

export default BikeCard;
