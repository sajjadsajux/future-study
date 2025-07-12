// src/pages/AdminDashboard.jsx
import React from "react";
import AdminAnalytics from "../AdminDashboard/AdminAnalytics";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 ">Admin Dashboard</h1>
      <p>Manage users, roles, and system settings here.</p>
      <AdminAnalytics></AdminAnalytics>
    </div>
  );
};

export default AdminDashboard;
