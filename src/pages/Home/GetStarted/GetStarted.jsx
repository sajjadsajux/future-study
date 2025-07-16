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
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 "> Get Started in 4 Simple Steps</h2>
        <p className="text-center text-gray-500 max-w-3xl mx-auto mb-10"> Follow these easy steps to find and apply for scholarships that can transform your academic future.</p>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group p-6 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg border border-white/10 shadow-md hover:shadow-xl transition duration-300 text-center">
              {/* Step Badge */}
              <div className="absolute top-3 left-3 text-xs font-semibold text-white bg-primary px-3 py-1 rounded-full shadow">Step {index + 1}</div>

              {/* Icon */}
              <div className="text-4xl text-primary mb-4 group-hover:scale-110 transition">{step.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-bold  mb-2">{step.title}</h3>

              {/* Description */}
              <p className="text-sm ">{step.description}</p>

              {/* Arrow Connector */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute right-[-18px] top-1/2 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-lg animate-pulse">→</div>
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
