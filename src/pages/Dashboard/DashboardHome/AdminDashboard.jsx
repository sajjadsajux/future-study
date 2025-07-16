// src/pages/AdminDashboard.jsx
import React from "react";
import AdminAnalytics from "../AdminDashboard/AdminAnalytics";
import useAuth from "../../../hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();
  const adminName = user?.displayName || user?.name || "Admin";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center ">Welcome, {adminName} 👋</h1>
      <p className="mb-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 text-center ">You are logged in as an administrator. Manage users, roles, scholarships, and settings from this panel.</p>

      {/* Analytics Section */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">📊 Platform Analytics</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Get real-time insights about application flow, user roles, and overall system usage.</p>
        <AdminAnalytics />
      </div>

      {/* Dashboard Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-1">👤 User Management</h3>
          <p className="text-sm">View all users, assign roles, and manage access levels securely.</p>
        </div>

        <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-1">🎓 Scholarships</h3>
          <p className="text-sm">Add, update, or remove scholarships with deadlines and fees.</p>
        </div>

        <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-1">📥 Applications</h3>
          <p className="text-sm">Track application status and feedback for each student.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
