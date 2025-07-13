import React from "react";
import { FaMoneyCheckAlt, FaRegChartBar, FaSearch, FaWpforms } from "react-icons/fa";

const GetStarted = () => {
  const steps = [
    {
      title: "Create an Account",
      description: "Sign up with your email to get started.",
      image: "https://images.unsplash.com/photo-1581091870622-2c51f1c8a8d1", // user profile
    },
    {
      title: "Explore Scholarships",
      description: "Browse thousands of scholarships tailored to you.",
      image: "https://images.unsplash.com/photo-1587614295999-fd3bd470b8ae", // books/study
    },
    {
      title: "Apply Easily",
      description: "Fill out a simple form and upload documents.",
      image: "https://images.unsplash.com/photo-1608491682527-0c8b9e7c5b94", // online form
    },
    {
      title: "Track Your Application",
      description: "View your status anytime from the dashboard.",
      image: "https://images.unsplash.com/photo-1587613991297-c0caeec1f212", // dashboard
    },
  ];

  return (
    <section className="py-12 ">
      <div className="container mx-auto ">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">🎯 Get Started in 4 Simple Steps</h2>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition duration-300 text-center w-full lg:w-1/4 relative">
              <div className="mb-2 text-sm text-gray-500 font-medium uppercase tracking-wide">Step {index + 1}</div>
              {step.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>

              {/* Arrow (visible only on large screens) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute right-[-28px] top-1/2 transform -translate-y-1/2">
                  <span className="text-3xl text-gray-400">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
