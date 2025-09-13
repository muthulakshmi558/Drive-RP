import { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";
import aboutBox from "../assets/images/about_box.png";

export default function MissionSection() {
  const [mission, setMission] = useState(null);

  useEffect(() => {
    API.get(endpoints.mission)
      .then((res) => {
        if (res.data.length > 0) {
          setMission(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const bgImage = mission?.image
    ? mission.image.startsWith("http")
      ? mission.image
      : `${API.defaults.baseURL}${mission.image}`
    : aboutBox;

  return (
    <section
      className="relative w-full h-[400px] md:h-[400px] rounded-2xl overflow-hidden font-['Roboto']"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "95% auto", 
        backgroundPosition: "center", 
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0" />

      {/* Text Content */}
      <div className="absolute bottom-16 right-16 z-10 text-right max-w-sm">
        <h2 className="text-xl text-center md:text-2xl font-bold mb-3" style={{ color: "#07435C" }}>
          {mission ? mission.title : "Our Mission"}
        </h2>
        <p className="text-black font-bold text-center text-sm md:text-base">
          {mission
            ? mission.description
            : "Our mission is to make cycling more accessible, affordable, and sustainable by creating a trusted marketplace for secondhand bikes."}
        </p>
      </div>
    </section>
  );
}
