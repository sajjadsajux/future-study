// src/routes/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import CommonLoader from "../components/shared/CommonLoader";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (authLoading || roleLoading) return <CommonLoader></CommonLoader>;

  if (!user) return <Navigate to="/login" replace />;

  return role === "admin" ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
