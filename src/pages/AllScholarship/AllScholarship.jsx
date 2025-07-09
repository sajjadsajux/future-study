import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import ScholarshipCard from "./ScholarshipCard";

const AllScholarship = () => {
  const axiosInstance = useAxios();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // 🔁 Delay search to reduce requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 400); // waits 400ms after typing stops
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships", search],
    queryFn: async () => {
      const res = await axiosInstance.get(`/scholarships?search=${search}`);
      return res.data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">All Scholarships</h2>

      <div className="flex justify-center mb-8">
        <input type="text" placeholder="Search by Scholarship, University or Degree" className="input input-bordered w-full max-w-xs" onChange={(e) => setSearchInput(e.target.value)} />
      </div>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : scholarships.length === 0 ? (
        <p className="text-center text-gray-500">No scholarships found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarship;
