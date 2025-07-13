import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchTopScholarships = async () => {
      try {
        const res = await axiosInstance.get("/top-scholarships");
        setScholarships(res.data);
      } catch (error) {
        console.error("Failed to fetch top scholarships:", error);
      }
    };

    fetchTopScholarships();
  }, [axiosInstance]);

  return (
    <section className="py-12 px-4 xl:px-0 ">
      <h2 className="text-3xl font-bold text-center mb-8">Top Scholarships</h2>
      <div className="grid gap-6  md:grid-cols-3 lg:grid-cols-4">
        {scholarships.map((scholarship) => (
          <div key={scholarship._id} className="card bg-base-100 shadow-lg">
            <figure className="px-4 pt-4">
              <img src={scholarship.universityImage} alt={scholarship.universityName} className="h-20 object-contain" />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl">{scholarship.universityName}</h3>
              <p>
                <strong>Category:</strong> {scholarship.scholarshipCategory}
              </p>
              <p>
                <strong>Location:</strong> {scholarship.universityCountry}, {scholarship.universityCity}
              </p>
              <p>
                <strong>Deadline:</strong> {new Date(scholarship.applicationDeadline).toLocaleDateString()}
              </p>
              <p>
                <strong>Subject:</strong> {scholarship.subjectCategory}
              </p>
              <p>
                <strong>Application Fee:</strong> ${scholarship.applicationFees}
              </p>
              <p className="text-yellow-500 font-semibold">⭐ {scholarship.avgRating || "No rating"}</p>
              <div className="card-actions justify-end mt-2">
                <Link to={`/scholarship/${scholarship._id}`} className="btn btn-secondary btn-sm text-black">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All Scholarship Button */}
      <div className="text-center mt-10">
        <Link to="/all-scholarship" className="btn btn-primary text-white">
          All Scholarship
        </Link>
      </div>
    </section>
  );
};

export default TopScholarships;
