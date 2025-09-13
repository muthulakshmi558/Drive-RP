import { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";

export default function SupportSection() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    API.get(endpoints.supportFeatures || "/support-features/")
      .then((res) => setFeatures(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-12 px-6 md:px-16 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#07435C] mb-12">
        Get the Support You Needs
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
        {features.map((item, index) => (
          <div key={item.id} className="flex flex-col items-center text-center relative">
            
            {/* Circle Image */}
            <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-[#07435C] p-2 relative z-10 bg-white">
              <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
            </div>

            {/* Arrow (SVG) */}
            {index < features.length - 1 && (
              <svg
                className="absolute top-16 right-[-60px] hidden md:block"
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M0,50 Q50,0 100,50"
                  stroke="#1E90FF"
                  strokeWidth="8"
                  fill="transparent"
                />
                <path
                  d="M85 40 L100 50 L85 60"
                  fill="#1E90FF"
                />
              </svg>
            )}

            {/* Text */}
            <h3 className="text-lg font-semibold text-[#07435C] mt-6">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
