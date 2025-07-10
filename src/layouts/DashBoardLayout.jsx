// layout/DashboardLayout.jsx
import React from "react";
import useUserRole from "../hooks/useUserRole";
import { FaHome, FaUser, FaUserShield, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <h2>loading</h2>;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-4">
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-200 text-base-content">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <li>
            <NavLink to="/" className="flex gap-2 items-center">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-profile" className="flex gap-2 items-center">
              <FaUser /> My Profile
            </NavLink>
          </li>

          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/my-applications" className="flex gap-2 items-center">
                  <FaClipboardList /> My Application
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/dashboard/my-scholarships" className="flex gap-2 items-center">
                  <FaClipboardList /> My reviews
                </NavLink>
              </li> */}
            </>
          )}

          {role === "moderator" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-scholarships" className="flex gap-2 items-center">
                  <FaClipboardList /> ManageScholarships
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/all-users" className="flex gap-2 items-center">
                  <FaUserShield /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-scholarship" className="flex gap-2 items-center">
                  <FaClipboardList /> Add Scholarship
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
