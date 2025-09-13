import React, { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";

const BookingSteps = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    API.get(endpoints.bookingSteps)
      .then((res) => {
        // Ensure steps is always an array
        if (Array.isArray(res.data)) {
          setSteps(res.data);
        } else if (res.data.results && Array.isArray(res.data.results)) {
          setSteps(res.data.results);
        } else {
          console.warn("Unexpected booking steps data format:", res.data);
          setSteps([]);
        }
      })
      .catch((err) => console.error("Error fetching booking steps:", err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#07435C]">
        Book This Bike in 3 Steps
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.length > 0 ? (
          steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <img
                src={step.image} // Django image URL
                alt={step.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold text-[#07435C] mb-2">
                {step.title}
              </h3>
              <p className="text-center text-[#07435C]">{step.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-[#07435C] col-span-3">
            No booking steps found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingSteps;
