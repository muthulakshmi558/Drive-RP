import { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";

export default function InfoSection() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    API.get(endpoints.infoSection)
      .then((res) => {
        if (res.data.length > 0) {
          setInfo(res.data[0]); // assuming only 1 info section
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!info) return null;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between bg-white py-12 px-6 md:px-16">
      {/* Left Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={info.image}
          alt="Info Section"
          className="w-[280px] md:w-[400px] object-contain"
        />
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 mt-8 md:mt-0 text-center md:text-left space-y-6">
        <p className="text-gray-700 leading-relaxed">{info.description}</p>
        {info.button_text && (
          <a
            href={info.button_link}
            className="inline-block bg-[#07435C] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            {info.button_text}
          </a>
        )}
      </div>
    </div>
  );
}
