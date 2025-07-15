import React from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CommonLoader from "../../../components/shared/CommonLoader";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    data: scholarship,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <CommonLoader></CommonLoader>;
  if (error) return <p>Error loading scholarship details</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-100">
      <div className="w-full max-w-3xl p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg space-y-4 dark:border-2">
        <h2 className="text-3xl font-bold text-center text-primary">{scholarship.scholarshipName}</h2>

        <div className="flex justify-center">
          <img src={scholarship.universityImage} alt="University" className="w-32 h-32 object-contain mb-4" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-base">
          <p>
            <strong>University:</strong> {scholarship.universityName}, {scholarship.universityCity}, {scholarship.universityCountry}
          </p>
          <p>
            <strong>Degree:</strong> {scholarship.degree}
          </p>
          <p>
            <strong>Subject:</strong> {scholarship.subjectCategory}
          </p>
          <p>
            <strong>Category:</strong> {scholarship.scholarshipCategory}
          </p>
          <p>
            <strong>Tuition Fees:</strong> {scholarship.tuitionFees}
          </p>
          <p>
            <strong>Application Fee:</strong> ${scholarship.applicationFees}
          </p>
          <p>
            <strong>Service Charge:</strong> ${scholarship.serviceCharge}
          </p>
          <p>
            <strong>Stipend:</strong> {scholarship.stipend}
          </p>
        </div>

        <p className="mt-4 text-justify leading-relaxed">
          <strong>Description:</strong> {scholarship.description}
        </p>

        {/* Button to go back to My Applications */}
        <div className="text-center mt-6">
          <button onClick={() => navigate("/dashboard/my-applications")} className="btn btn-primary px-6 py-2 text-white text-sm md:text-base rounded-md">
            Go to My Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
