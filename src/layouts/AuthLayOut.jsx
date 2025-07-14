import React from "react";
import authImage from "../assets/auth-illustration.svg"; // Make sure the image exists
import { Outlet } from "react-router";

const AuthLayOut = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-5xl  shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row border border-base-200">
        {/* Left: Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-primary p-6 items-center justify-center">
          <img src={authImage} alt="Authentication" className="w-full max-w-sm object-contain" />
        </div>

        {/* Right: Auth Form */}
        <div className="md:w-1/2 p-6 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayOut;
