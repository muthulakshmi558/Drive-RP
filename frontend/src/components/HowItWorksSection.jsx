import React, { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(endpoints.howItWorksSection)
      .then(res => {
        if (res.data.length > 0) setSection(res.data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10 text-xl">Loading...</p>;
  if (!section) return <p className="text-center py-10 text-xl">No data available</p>;

  return (
    <div 
      className="py-16 px-5"
      style={{ backgroundColor: section.background_color }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">{section.section_title}</h2>

      {section.cards?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {section.cards.map((card, index) => (
            <motion.div 
              key={card.id} 
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.2 }}
            >
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{card.title}</h3>
              {card.description && <p className="text-gray-600 mt-2">{card.description}</p>}
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg mt-6">No items to show</p>
      )}
    </div>
  );
};

export default HowItWorksSection;
