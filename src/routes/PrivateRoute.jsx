import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import CommonLoader from "../components/shared/CommonLoader";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();
  // console.log(location);
  const from = location.pathname;
  if (loading) {
    return <CommonLoader></CommonLoader>;
  }
  if (!user) {
    return <Navigate state={{ from: from }} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
