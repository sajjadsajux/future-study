import React from "react";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  const { _id, scholarshipName, universityName, universityImage, universityCity, universityCountry, subjectCategory, scholarshipCategory, applicationDeadline, applicationFees, rating, degree } = scholarship;

  return (
    <div className="card bg-base-100 shadow-xl border">
      <figure className="px-6 pt-6">
        <img src={universityImage} alt={universityName} className="h-28 object-contain" />
      </figure>
      <div className="card-body space-y-2">
        <h2 className="text-lg font-bold">{scholarshipName}</h2>
        <p className="text-sm">
          {universityName}, {universityCity}, {universityCountry}
        </p>
        <p>
          <strong>Category:</strong> {scholarshipCategory}
        </p>
        <p>
          <strong>Degree:</strong> {degree}
        </p>
        <p>
          <strong>Subject:</strong> {subjectCategory}
        </p>
        <p>
          <strong>Deadline:</strong> {applicationDeadline}
        </p>
        <p>
          <strong>Fee:</strong> ৳{applicationFees}
        </p>
        <p>
          <strong>Rating:</strong> ⭐ {rating || "N/A"}
        </p>
        <Link to={`/scholarship/${_id}`} className="btn btn-secondary btn-sm text-black">
          Details
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
