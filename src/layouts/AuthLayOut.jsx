import React from "react";
import authImage from "../assets/auth-illustration.svg"; // Make sure the image exists
import { Outlet } from "react-router";

const AuthLayOut = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side: Illustration */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gray-100 p-8">
        <img src={authImage} alt="Authentication Illustration" className="w-full max-w-md" />
      </div>

      {/* Right Side: Auth Form (Login/Register via Outlet) */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayOut;
