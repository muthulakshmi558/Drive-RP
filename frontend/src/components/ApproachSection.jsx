import { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";
import aboutBox from "../assets/images/about_box.png"; // fallback if backend misses images

export default function ApproachSection() {
  const [approach, setApproach] = useState(null);

  useEffect(() => {
    API.get(endpoints.approach)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) setApproach(res.data[0]);
        else if (res.data && typeof res.data === "object") setApproach(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const getImageUrl = (item) => {
    if (!item) return null;

    // item may be: "string", { image: "url" }, or { image: { url: "..." } }
    if (typeof item === "string") {
      return item.startsWith("http") ? item : `${API.defaults.baseURL}${item}`;
    }

    const candidate =
      item.image && typeof item.image === "object" && item.image.url
        ? item.image.url
        : item.image || item.url || item.file || item.src || "";

    if (!candidate) return null;
    return candidate.startsWith("http") ? candidate : `${API.defaults.baseURL}${candidate}`;
  };

  const raw = approach?.images || [];
  const resolved = raw.map(getImageUrl).filter(Boolean);
  while (resolved.length < 5) resolved.push(aboutBox);
  const [img1, img2, img3, img4, img5] = resolved;

  return (
    <section className="w-full py-10 md:py-16 font-['Roboto']">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* LEFT: Content */}
        <div className="px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#07435C] mb-6 text-center md:text-left">
            {approach?.title ?? "Our Approach"}
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center md:text-left max-w-2xl mx-auto md:mx-0">
            {approach?.description ?? ""}
          </p>
        </div>

        {/* RIGHT: Images */}
        <div className="w-full">
          <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 h-[460px]">
            <img src={img1} alt="approach-1" className="object-cover rounded-2xl w-full h-full row-start-1 col-start-1" />
            <img src={img2} alt="approach-2" className="object-cover rounded-2xl w-full h-full row-start-2 col-start-1" />
            <img src={img3} alt="approach-3" className="object-cover rounded-2xl w-full h-full row-start-1 col-start-2" />
            <img src={img4} alt="approach-4" className="object-cover rounded-2xl w-full h-full row-start-2 col-start-2" />
            <img src={img5} alt="approach-5" className="object-cover rounded-2xl w-full h-full row-span-2 col-start-3" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden mt-4">
            {[img1, img3, img5, img2, img4].map((s, i) => (
              <img key={i} src={s} alt={`approach-m-${i}`} className="w-full h-44 sm:h-56 object-cover rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
