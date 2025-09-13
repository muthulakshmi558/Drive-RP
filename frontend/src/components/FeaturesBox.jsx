import { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";

export default function FeaturesBox() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    API.get(endpoints.features)
      .then((res) => setFeatures(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-black rounded-2xl py-8 px-4 md:px-12 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Over 15000+ Satisfied Customers
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center space-y-3">
            <img
              src={feature.icon}
              alt={feature.subtitle}
              className="w-12 h-12 md:w-14 md:h-14"
            />
            <p className="text-2xl md:text-3xl font-bold">{feature.number}</p>
            <p className="text-base md:text-lg">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
