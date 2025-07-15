import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import UserDashboard from "./UserDashboard ";
import ModeratorDashboard from "./ModeratorDashboard";
import AdminDashboard from "./AdminDashboard";
import CommonLoader from "../../../components/shared/CommonLoader";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <CommonLoader></CommonLoader>;
  }

  if (role === "user") {
    return <UserDashboard />;
  } else if (role === "moderator") {
    return <ModeratorDashboard />;
  } else if (role === "admin") {
    return <AdminDashboard />;
  } else {
    return <h2>wrong</h2>;
  }
};

export default DashboardHome;
