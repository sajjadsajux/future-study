import React, { useEffect, useState } from "react";
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
  const limit = 8;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // reset page on new search
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading } = useQuery({
    queryKey: ["scholarships", page, search],
    queryFn: async () => {
      const res = await axiosInstance.get(`/scholarships?page=${page}&limit=${limit}&search=${search}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const scholarships = data?.scholarships || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  useTitle(`All Scholarships - ${scholarships.length}`);
  useScrollToTop();
  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">All Scholarships</h1>
        <p className="text-lg max-w-3xl mx-auto ">We are on a mission to make education accessible for everyone by simplifying the scholarship search and application process.</p>
      </div>

      <div className="flex justify-center mb-8">
        <input type="text" placeholder="Search by Scholarship, University or Degree" className="input input-bordered w-full max-w-xs" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </div>

      {isLoading ? (
        <CommonLoader></CommonLoader>
      ) : scholarships.length === 0 ? (
        <p className="text-center text-gray-500">No scholarships found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
