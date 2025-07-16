import React from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="container mx-auto px-4 lg:px-0 py-10 min-h-screen">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-primary transition-opacity duration-500 opacity-100">
          Welcome back, <span className="capitalize">{user.displayName}</span>! 🎓
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 transition duration-500">This is your student dashboard, manage your profile, track your applications, and share your experiences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-10">
        {[
          {
            title: "My Profile",
            emoji: "👤",
            description: "View and update your name, photo, and contact info.",
            link: "/dashboard/my-profile",
          },
          {
            title: "My Applications",
            emoji: "📄",
            description: "Track your scholarship submissions and statuses.",
            link: "/dashboard/my-applications",
          },
          {
            title: "My Reviews",
            emoji: "⭐",
            description: "Share your feedback and guide future students.",
            link: "/dashboard/my-reviews",
          },
        ].map(({ title, emoji, description, link }) => (
          <div key={title} className={`dark:bg-white/10 border border-base-300 rounded-xl p-6 shadow hover:shadow-lg transition duration-500 transform hover:-translate-y-1`}>
            <h2 className="text-xl font-semibold mb-2 text-primary">
              {emoji} {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{description}</p>
            <Link to={link} className="inline-block text-sm text-blue-600 font-medium hover:underline transition">
              Go to {title} →
            </Link>
          </div>
        ))}
      </div>

      {/* Extra Dashboard Section */}
      <div className="mt-16 space-y-10 max-w-5xl mx-auto">
        {/* Quick Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">📌 Quick Tips</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Keep your profile updated for personalized recommendations.</li>
            <li>Check “My Applications” regularly for new feedback or status changes.</li>
            <li>Don’t forget to leave a review after you receive your results.</li>
          </ul>
        </div>

        {/* Motivational Quote */}
        <div className="text-center py-6 px-4 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-white/10 dark:to-white/10 rounded-xl shadow">
          <p className="text-lg italic font-medium text-gray-700 dark:text-gray-300">“The future belongs to those who believe in the beauty of their dreams.” – Eleanor Roosevelt</p>
        </div>

        {/* Friendly Alert */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-5 rounded-lg flex items-start gap-4 shadow">
          <span className="text-yellow-500 text-xl">⚠️</span>
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Reminder</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">Applications with missing documents will not be processed. Double-check before you submit!</p>
          </div>
        </div>

        {/* Contact Help */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">Need help or have questions?</p>
          <Link to="/contact" className="btn btn-outline btn-primary rounded-full">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
