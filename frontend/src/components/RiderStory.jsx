import React, { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";  // import centralized api

export default function RiderStory() {
  const [story, setStory] = useState(null);

  useEffect(() => {
    API.get(endpoints.riderStory)
      .then((res) => {
        if (res.data.length > 0) {
          setStory(res.data[0]); // get first entry
        }
      })
      .catch((err) => console.error("Error fetching Rider Story:", err));
  }, []);

  if (!story) return null;

  return (
    <div className="bg-[#07435C] text-white font-roboto p-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-lg">
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{story.title}</h2>
        <p className="text-base leading-relaxed">{story.description}</p>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2">
        <img
          src={story.image}
          alt={story.title}
          className="rounded-lg shadow-lg w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
