import React, { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";
import BikeCard from "./BikeCard";
import Filters from "./Filters";

const BikeListing = () => {
  const [bikes, setBikes] = useState([]);
  const [filters, setFilters] = useState({});
  const [ordering, setOrdering] = useState("");

  useEffect(() => {
    fetchBikes();
  }, [filters, ordering]);

  const fetchBikes = async () => {
    try {
      let params = { ...filters };
      if (ordering) params.ordering = ordering;

      const res = await API.get(endpoints.bikes, { params });
      setBikes(res.data);
    } catch (error) {
      console.error("Error fetching bikes", error);
    }
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Left Filters */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* Right Side */}
      <div className="w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">{bikes.length} Bikes Found</h2>
          <select
            className="border p-2 rounded"
            onChange={(e) => setOrdering(e.target.value)}
          >
            <option value="">Newest First</option>
            <option value="price">Price - Low to High</option>
            <option value="-price">Price - High to Low</option>
            <option value="km_driven">KM Driven - Low to High</option>
            <option value="-km_driven">KM Driven - High to Low</option>
            <option value="year">Year - Old to New</option>
            <option value="-year">Year - New to Old</option>
          </select>
        </div>

        {/* Bike Cards */}
        <div className="grid grid-cols-3 gap-4">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BikeListing;
