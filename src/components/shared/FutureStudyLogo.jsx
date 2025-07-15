import React from "react";
import { Link } from "react-router";

const FutureStudyLogo = ({ width = 40, height = 40 }) => {
  return (
    <Link to="/" className="inline-flex items-center">
      <img src="FutureStudy.png" alt="FutureStudy Logo" width={width} height={height} className="object-contain" />
    </Link>
  );
};

export default FutureStudyLogo;
