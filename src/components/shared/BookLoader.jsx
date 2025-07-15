import Lottie from "lottie-react";
import React from "react";
import loadingAnimation from "../../assets/robotjson.json";

const BookLoader = ({ width = 200, height = 200 }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Lottie animationData={loadingAnimation} loop={true} style={{ width, height }} />
    </div>
  );
};

export default BookLoader;
