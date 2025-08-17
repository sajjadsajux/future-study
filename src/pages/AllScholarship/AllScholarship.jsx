import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import ScholarshipCard from "./ScholarshipCard";
import BookLoader from "../../components/shared/BookLoader";
import CommonLoader from "../../components/shared/CommonLoader";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";

const AllScholarship = () => {
  const axiosInstance = useAxios();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortByDeadline, setSortByDeadline] = useState("soonest"); // new state
  const limit = 8;

  // Manual search trigger
  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1); // reset to first page
  };

  const { data, isLoading } = useQuery({
    queryKey: ["scholarships", page, search, sortByDeadline], // added sortByDeadline
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/scholarships?page=${page}&limit=${limit}&search=${search}&sortByDeadline=${sortByDeadline}` // pass sort param
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const scholarships = data?.scholarships || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  useTitle(`All Scholarships`);
  useScrollToTop();

  return (
    <div className="container lg:max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">All Scholarships</h1>
        <p className="text-lg max-w-3xl mx-auto ">We are on a mission to make education accessible for everyone by simplifying the scholarship search and application process.</p>
      </div>

      {/* Search + Sort Controls */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Search Box */}
        <div className="flex gap-3 w-full md:w-2/3">
          <input type="text" placeholder="Search by Scholarship, University or Degree" className="input input-bordered w-full" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <button className="btn btn-primary">Search</button>
        </div>

        {/* Sorting Dropdown */}
        <div className="w-full md:w-1/3">
          <select
            className="select select-bordered w-full"
            value={sortByDeadline}
            onChange={(e) => {
              setSortByDeadline(e.target.value);
              setPage(1);
            }}
          >
            <option value="soonest">Deadline: Soonest first</option>
            <option value="furthest">Deadline: Furthest first</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <CommonLoader></CommonLoader>
      ) : scholarships.length === 0 ? (
        <p className="text-center text-gray-500">No university, scholarships, degree found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {scholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 gap-4 items-center">
            <button className="btn btn-sm btn-primary" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Prev
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button className="btn btn-sm btn-secondary" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllScholarship;
