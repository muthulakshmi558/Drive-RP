import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 👈 useNavigate added
import API, { endpoints } from "../api/api";

const BikeDetails = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const navigate = useNavigate(); // 👈 hook for navigation

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const res = await API.get(`${endpoints.bikes}${id}/`);
        setBike(res.data);
      } catch (err) {
        console.error("Error fetching bike details", err);
      }
    };
    fetchBike();
  }, [id]);

  if (!bike) return <p>Loading...</p>;

  // ✅ Buy Now handler
  const handleBuyNow = () => {
    // pass bike data to payment page via state
    navigate("/payment", { state: { bike } });
  };

  return (
    <div className="p-8 flex gap-8">
      {/* Left - Image + thumbnails */}
      <div className="w-2/3">
        <img
          src={`http://127.0.0.1:8000/media/${bike.image}`}
          alt={bike.title}
          className="rounded-lg shadow-lg w-full h-[400px] object-cover"
        />
        <div className="flex gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={`http://127.0.0.1:8000/media/${bike.image}`}
              alt={`${bike.title} ${i}`}
              className="w-20 h-20 rounded border"
            />
          ))}
        </div>
      </div>

      {/* Right - Details */}
      <div className="w-1/3 border rounded p-6 shadow">
        <h2 className="text-xl font-bold mb-2">{bike.title}</h2>
        <p>{bike.km_driven} Km · {bike.owner}</p>
        <p className="font-semibold">{bike.location}</p>
        <p className="text-2xl font-bold mt-3">₹ {bike.price}</p>

        <button className="w-full bg-[#07435C] text-white py-2 px-4 mt-4 rounded">
          Book Test Ride <br />
          <span className="text-sm">(₹1000 refundable for next 3 days)</span>
        </button>

        <p className="mt-4">Interested in buying this bike?</p>
        <button
          onClick={handleBuyNow} // 👈 navigate to payment page
          className="w-full bg-[#07435C] text-white py-2 px-4 mt-2 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BikeDetails;
