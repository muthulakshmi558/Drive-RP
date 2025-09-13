import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="font-bold mb-3 text-lg">Filter</h2>

      {/* Budget */}
      <div className="mb-4">
        <p className="font-semibold">Budget</p>
        <button
          className="text-sm text-blue-600"
          onClick={() => handleFilterChange("price__lte", 200000)}
        >
          ₹ 0 - ₹ 2,00,000
        </button>
      </div>

      {/* Category */}
      <div className="mb-4">
        <p className="font-semibold">Category</p>
        <select
          className="border p-1 rounded w-full"
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="">All</option>
          <option value="scooter">Scooty</option>
          <option value="sports">Motorbike</option>
          <option value="ev">EVs</option>
        </select>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <p className="font-semibold">Brand</p>
        <select
          className="border p-1 rounded w-full"
          onChange={(e) => handleFilterChange("brand", e.target.value)}
        >
          <option value="">All</option>
          <option value="TVS">TVS</option>
          <option value="Honda">Honda</option>
          <option value="Bajaj">Bajaj</option>
          <option value="Hero">Hero</option>
          <option value="Royal Enfield">Royal Enfield</option>
        </select>
      </div>

      {/* Engine CC */}
      <div className="mb-4">
        <p className="font-semibold">Engine CC</p>
        <select
          className="border p-1 rounded w-full"
          onChange={(e) => handleFilterChange("engine_cc__lte", e.target.value)}
        >
          <option value="">All</option>
          <option value="100">Below 100CC</option>
          <option value="200">Below 200CC</option>
          <option value="300">Below 300CC</option>
          <option value="400">Below 400CC</option>
          <option value="500">Below 500CC</option>
        </select>
      </div>

      {/* Fuel Type */}
      <div className="mb-4">
        <p className="font-semibold">Fuel Type</p>
        <select
          className="border p-1 rounded w-full"
          onChange={(e) => handleFilterChange("fuel_type", e.target.value)}
        >
          <option value="">All</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>
      </div>

      {/* Color */}
      <div className="mb-4">
        <p className="font-semibold">Color</p>
        <select
          className="border p-1 rounded w-full"
          onChange={(e) => handleFilterChange("color", e.target.value)}
        >
          <option value="">All</option>
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="white">White</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
