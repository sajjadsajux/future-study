import React from "react";
import { Link } from "react-router";

const FutureStudyLogo = ({ width = 40, height = 40, text = true }) => {
  return (
    <Link to="/" className="inline-flex items-center gap-2">
      <img src="FutureStudy.png" alt="FutureStudy Logo" width={width} height={height} className="object-contain" />
      {text && <span className="text-xl font-bold tracking-wide text-primary">FutureStudy</span>}
    </Link>
  );
};

export default FutureStudyLogo;
