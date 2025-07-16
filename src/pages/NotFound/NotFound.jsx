import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/notfound.json"; // Make sure the path is correct
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-800 to-rose-200 ">
      <Lottie animationData={notFoundAnimation} loop className="w-72 sm:w-80 md:w-96 lg:w-3xl xl:w-4xl mb-6 " />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold  mb-3">Page Not Found</h1>

      <p className=" max-w-md text-base sm:text-lg">The page you’re looking for doesn’t exist or has been moved.</p>

      <Link to="/" className="btn btn-primary mt-6 rounded-full text-sm sm:text-base px-6 py-2">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
