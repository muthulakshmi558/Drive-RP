import { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";

export default function TestimonialSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    API.get(endpoints.testimonials)
      .then((res) => {
        if (res.data.length > 0) {
          setSection(res.data[0]); // take first section
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!section) return null;

  return (
    <div className="py-16 bg-white text-center">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-black">
        {section.title}
      </h2>
      <p className="text-[#07435C] mt-2">{section.subtitle}</p>

      {/* Reviews */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">
        {section.reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden transition"
            style={{
              boxShadow: "0 0 15px 4px rgba(15, 233, 196, 0.6)", // green shadow all 4 sides
            }}
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-[#07435C]">
                {review.name} – {review.role}
              </h3>
              <p className="text-black mt-2 text-sm">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
