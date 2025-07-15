import React from "react";
import { PacmanLoader } from "react-spinners";

const CommonLoader = ({ size = 25, color = "#1446a0" }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <PacmanLoader size={size} color={color} />
    </div>
  );
};

export default CommonLoader;
