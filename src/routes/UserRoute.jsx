import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import CommonLoader from "../components/shared/CommonLoader";

const UserRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (authLoading || roleLoading) return <CommonLoader></CommonLoader>;

  if (!user) return <Navigate to="/login" replace />;

  if (role !== "user") return <Navigate to="/dashboard" replace />;

  return children;
};

export default UserRoute;
