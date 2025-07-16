import React from "react";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import CommonLoader from "../../../components/shared/CommonLoader";

const TopScholarships = () => {
  const axiosInstance = useAxios();

  const fetchTopScholarships = async () => {
    const res = await axiosInstance.get("/top-scholarships");
    return res.data;
  };

  const {
    data: scholarships = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["top-scholarships"],
    queryFn: fetchTopScholarships,
  });

  if (isLoading)
    return (
      <div className="text-center py-20">
        <CommonLoader></CommonLoader>
      </div>
    );

  if (isError) return <div className="text-center py-20 text-red-500">Failed to load scholarships.</div>;

  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Top Scholarships</h2>
      <p className="text-center text-gray-500 max-w-3xl mx-auto mb-10"> Explore our curated list of prestigious scholarships to help you achieve your educational goals worldwide.</p>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {scholarships.map((scholarship) => (
          <div key={scholarship._id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg overflow-hidden  transform transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col">
            {/* Content */}
            <div className="p-6 flex flex-col justify-between flex-grow min-h-[320px]">
              {/* Image Avatar */}
              <div className="flex justify-center mb-4 relative">
                <img src={scholarship.universityImage} alt={scholarship.universityName} className="w-20 h-20 object-contain rounded-full border-2 border-white/20 shadow-md" />
                <span className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-secondary/90 text-white font-semibold text-xs shadow-lg">{scholarship.scholarshipCategory}</span>
              </div>

              {/* Text Content */}
              <div className="text-center space-y-3">
                <h3 className="text-xl font-bold text-primary">{scholarship.universityName}</h3>

                <div className="flex flex-wrap justify-center  text-sm px-3">
                  <span className=" px-1 rounded-full  font-semibold">{scholarship.universityCity},</span>
                  <span className="  rounded-full  font-semibold">{scholarship.universityCountry}</span>
                </div>

                <div className="text-sm space-y-1 pt-1">
                  <p>
                    <strong>Subject:</strong> {scholarship.subjectCategory}
                  </p>
                  <p>
                    <strong>Deadline:</strong> <span className="text-red-500">{new Date(scholarship.applicationDeadline).toLocaleDateString()}</span>
                  </p>
                  <p>
                    <strong>Application Fee:</strong> ${scholarship.applicationFees}
                  </p>
                  <p className="flex justify-center items-center">
                    <strong>Rating:</strong>{" "}
                    <span className="font-semibold inline-flex items-center gap-1">
                      <FaStar className="text-yellow-400" /> {scholarship.avgRating || "No rating"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="mt-6">
                <Link to={`/scholarship/${scholarship._id}`} className="btn btn-sm bg-primary text-white hover:bg-primary/90 rounded-md w-full">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/all-scholarship" className="btn btn-primary text-white">
          All Scholarship
        </Link>
      </div>
    </section>
  );
};

export default TopScholarships;
