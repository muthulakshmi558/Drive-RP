import { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";

export default function AboutUs() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    API.get(endpoints.about)
      .then((res) => {
        if (res.data.length > 0) {
          setAbout(res.data[0]); // take first about section
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // store image in a variable
  const aboutImage = about?.image || "/about1.png"; // fallback if backend has no image

  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-12 font-['Roboto']">
      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src={aboutImage}
          alt={about ? about.title : "About Drive RP"}
          className="max-w-sm md:max-w-md"
        />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ color: "#07435C" }}
        >
          {about ? about.title : "About Us"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {about
            ? about.description
            : `.`}
        </p>
      </div>
    </section>
  );
}
