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
              <li>
                <NavLink to="/dashboard/my-reviews" className="flex gap-2 items-center">
                  <FaClipboardList /> My Reviews
                </NavLink>
              </li>
            </>
          )}

          {role === "moderator" && (
            <>
              <li>
                <NavLink to="/dashboard/moderator/manage-scholarships" className="flex gap-2 items-center">
                  <FaClipboardList /> Manage Scholarships
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/moderator/all-reviews" className="flex gap-2 items-center">
                  <FaClipboardList /> All Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/moderator/all-applied-scholarships" className="flex gap-2 items-center">
                  <FaClipboardList /> All Applied Scholarship
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/moderator/add-scholarships" className="flex gap-2 items-center">
                  <FaClipboardList /> Add Scholarships
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin/add-scholarships" className="flex gap-2 items-center">
                  <FaClipboardList /> Add Scholarship
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-scholarships" className="flex gap-2 items-center">
                  <FaClipboardList /> Manage Scholarships
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/all-applied-scholarships" className="flex gap-2 items-center">
                  <FaClipboardList /> Manage Applied Application
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-users" className="flex gap-2 items-center">
                  <FaClipboardList /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/all-reviews" className="flex gap-2 items-center">
                  <FaClipboardList /> Manage Reviews
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
