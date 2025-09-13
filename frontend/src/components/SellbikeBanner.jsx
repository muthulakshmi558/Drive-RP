import React, { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";

const SellBanner = () => {
  const [sellbanner, setSellBanner] = useState(null);

  useEffect(() => {
    API.get(endpoints.sellBanner)
      .then((res) => {
        if (res.data.length > 0) {
          setSellBanner(res.data[0]); // get the first banner
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!sellbanner) return null; // or a loader

  return (
    <div
      className="w-full h-[350px] bg-cover bg-center"
      style={{ backgroundImage: `url(${sellbanner.image})` }}
    >
      {/* Optional: add overlay or text */}
    </div>
  );
};

export default SellBanner;
