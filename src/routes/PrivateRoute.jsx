import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();
  // console.log(location);
  const from = location.pathname;
  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (!user) {
    return <Navigate state={{ from: from }} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
