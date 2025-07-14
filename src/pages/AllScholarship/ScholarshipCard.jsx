import React from "react";
import { Link } from "react-router";
import { FormatDate } from "../../utilities/FormateDate";

const ScholarshipCard = ({ scholarship }) => {
  const { _id, scholarshipName, universityName, universityImage, universityCity, universityCountry, subjectCategory, scholarshipCategory, applicationDeadline, applicationFees, rating, degree } = scholarship;

  return (
    <div className="relative rounded-2xl shadow-md border hover:shadow-xl transition duration-300 overflow-hidden flex flex-col ">
      {/* Badge in Corner */}
      <div className="absolute top-3 right-3">
        <span className="badge badge-secondary text-xs px-3 py-1 rounded-full">{scholarshipCategory}</span>
      </div>

      {/* University Banner */}
      <div className="p-6 flex justify-center items-center bg-gray-100 dark:bg-gray-800 ">
        <img src={universityImage} alt={universityName} className="h-20 object-contain" />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title + Location */}
          <h2 className="text-xl font-bold text-primary mb-1 text-center">{universityName}</h2>
          <p className="text-sm  mb-2 text-center">
            {universityCity}, {universityCountry}
          </p>
          <p className="text-sm mb-4 text-center font-semibold outline">{scholarshipName}</p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
            <p>
              <span className="font-semibold">Degree:</span> {degree}
            </p>
            <p>
              <span className="font-semibold">Subject:</span> {subjectCategory}
            </p>
            <p>
              <span className="font-semibold">Fee:</span> ${applicationFees}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> ⭐ {rating || "N/A"}/5
            </p>
          </div>

          {/* Deadline full width */}
          <p className="mt-3 text-sm">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Deadline:</span> {FormatDate(applicationDeadline)}
          </p>
        </div>

        {/* CTA */}
        <Link to={`/scholarship/${_id}`} className="btn btn-primary btn-sm w-full mt-5">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
