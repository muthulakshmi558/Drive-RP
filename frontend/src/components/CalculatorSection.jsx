import React, { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";

const brands = ["OtherBrands","TVS","VESPA","YAMAHA","ROYAL ENFIELD","SUSUKI","KTM","BAJAJ","HERO","HERO HONDA"];
const models = ["Avenger","Boxer","Chetak","CT100","CT110","Discover","Discover M","Discover F","Platina","pulsar"];
const variants = [
  "125CC Split Seat Disc BS6","150CC","150CC ABS","150CC Neon","150CC Classic","180CC Neon ABS","ABS 220F"
];
const kmsDriven = ["1-5000","5001-10000","10001-20000","20001-50000","50001-100000","100001-150000","150001-200000"];
const owners = ["1st Owner","2nd Owner","3rd Owner","4th Owner","5th Owner"];

const CalculatorSection = () => {
  const [section, setSection] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    variant: "",
    year: "",
    kms: "",
    owner: ""
  });
  const [price, setPrice] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
useEffect(() => {
    API.get(endpoints.calculatorSection)
      .then(res => {
        if(res.data.length > 0) setSection(res.data[0]);
      })
      .catch(err => console.error(err));
}, []);  // <-- this should close the useEffect properly

const handleChange = (e) => {
  setFormData({...formData, [e.target.name]: e.target.value});
};

const handleSubmit = (e) => {
  e.preventDefault();
  let base = 50000;

  const year = parseInt(formData.year) || 0;
  const owner = parseInt(formData.owner) || 1;
  const kms = formData.kms; // string like "1-5000"
  
  // Year adjustment
  if(year > 5) base -= 5000;
  if(year > 10) base -= 10000;

  // Owner adjustment
  if(owner > 2) base -= 5000;

  // KMs adjustment
  if(kms === "50001-100000") base -= 5000;
  if(kms === "100001-150000") base -= 10000;
  if(kms === "150001-200000") base -= 15000;

  // Variant adjustment
  if(formData.variant.includes("ABS")) base += 5000;

  setPrice(base);
  setShowPopup(true);
}

  if(!section) return null;

  return (
    <div className="relative w-full">
      {/* Background Image */}
<img 
  src={section.background_image} 
  alt="Calculator BG" 
  className="w-[90%] mx-[5%] my-10 h-[400px] object-cover rounded-xl"
/>      
      {/* Absolute Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center  text-white p-4">
        <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
        <form className="bg-white text-black p-6 rounded-lg w-full max-w-4xl" onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <select name="brand" onChange={handleChange} className="p-2 border rounded w-full">
      <option value="">Select Brand</option>
      {brands.map((b,i)=><option key={i} value={b}>{b}</option>)}
    </select>

    <select name="model" onChange={handleChange} className="p-2 border rounded w-full">
      <option value="">Select Model</option>
      {models.map((m,i)=><option key={i} value={m}>{m}</option>)}
    </select>

    <select name="variant" onChange={handleChange} className="p-2 border rounded w-full">
      <option value="">Select Variant</option>
      {variants.map((v,i)=><option key={i} value={v}>{v}</option>)}
    </select>

    <input name="year" type="number" placeholder="Enter Year" className="p-2 border rounded w-full" onChange={handleChange} />

    <select name="kms" onChange={handleChange} className="p-2 border rounded w-full">
      <option value="">KMs Driven</option>
      {kmsDriven.map((k,i)=><option key={i} value={k}>{k}</option>)}
    </select>

    <select name="owner" onChange={handleChange} className="p-2 border rounded w-full">
      <option value="">Owner</option>
      {owners.map((o,i)=><option key={i} value={i+1}>{o}</option>)}
    </select>
  </div>

  <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Get Price</button>
</form>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80 text-center">
              <h3 className="text-xl font-bold mb-4">Estimated Price</h3>
              <p className="text-2xl text-black font-semibold mb-4">₹ {price}</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={()=>setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CalculatorSection;
