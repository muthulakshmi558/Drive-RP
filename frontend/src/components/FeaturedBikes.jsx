import { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";
import { MapPin, Gauge } from "lucide-react";

export default function FeaturedBikes() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    API.get(endpoints.featuredBikes || "/featured-bikes/")
      .then((res) => setBikes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-12 px-6 md:px-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#07435C] mb-10">
        Our Few Bikes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {bikes.map((bike) => (
          <div
            key={bike.id}
            className="bg-[#E6FAFF] rounded-xl shadow-md overflow-hidden transition hover:shadow-xl"
          >
            {/* Image */}
            <img
              src={bike.image}
              alt={bike.title}
              className="w-full h-60 object-cover"
            />

            {/* Content */}
            <div className="p-4 space-y-2 text-center">
              <h3 className="font-semibold text-lg text-[#07435C]">{bike.title}</h3>

              <p className="text-2xl flex items-center justify-center text-black-700 text-sm">
                <Gauge className="w-4 h-4 mr-1" />
                {bike.km_driven} • {bike.fuel_type} • {bike.owner}
              </p>

              <p className="text-2xl font-bold text-black">{bike.price}</p>

              <p className="flex items-center justify-center text-black-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {bike.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
