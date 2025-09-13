import { useEffect, useState } from "react";
import API from "../api/api";

export default function HomeBanner() {
  const [banner, setBanner] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    API.get("/home-banner/")
      .then((res) => {
        if (res.data.length > 0) {
          setBanner(res.data[0]); // assuming only 1 banner
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (banner?.images?.length > 0) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % banner.images.length);
      }, 1000); // 1 second interval
      return () => clearInterval(interval);
    }
  }, [banner]);

  if (!banner) return null;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between bg-white py-12 px-6 md:px-16">
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-3xl md:text-3xl font-bold text-[#07435C]">{banner.title}</h1>
        <p className="text-gray-700">{banner.description}</p>
        <a
          href={banner.button_link}
          className="inline-block bg-[#07435C] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          {banner.button_text}
        </a>
      </div>

      {/* Right Image Box */}
      <div className="relative md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative">
          {banner.images.map((img, index) => (
            <img
              key={img.id}
              src={img.image}
              alt="Bike"
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
