// src/routes/ModeratorRoute.jsx
import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const ModeratorRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (authLoading || roleLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return role === "moderator" || role === "admin" ? children : <Navigate to="/" replace />;
};

export default ModeratorRoute;
