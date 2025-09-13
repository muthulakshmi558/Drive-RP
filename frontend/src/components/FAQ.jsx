import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/faqs/") // backend API
      .then(res => setFaqs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-[#E0F7FA] py-10 px-6 md:px-20 rounded-lg shadow-sm">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <p className="font-semibold">
              {index + 1}. {faq.question}
            </p>
            {faq.answer && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
