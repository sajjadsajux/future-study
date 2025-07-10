import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading scholarship details</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{scholarship.scholarshipName}</h2>
      <img src={scholarship.universityImage} alt="University" className="w-40 mb-4" />

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
      <p className="mt-4 text-justify">
        <strong>Description:</strong> {scholarship.description}
      </p>
    </div>
  );
};

export default ScholarshipDetails;
