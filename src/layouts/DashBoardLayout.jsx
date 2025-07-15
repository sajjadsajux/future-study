import React from "react";
import useUserRole from "../hooks/useUserRole";
import { NavLink, Outlet } from "react-router";
import { Home, User, ShieldCheck, ClipboardList, LogOut, Menu, Star, BookOpenCheck, Users, FilePlus, FileSearch } from "lucide-react";
import ThemeToggle from "../hooks/ThemeToggle";
import CommonLoader from "../components/shared/CommonLoader";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <CommonLoader></CommonLoader>;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content p-4">
        {/* Toggle Button (only on small devices) */}
        <div className="lg:hidden mb-4">
          <label htmlFor="dashboard-drawer" className="btn btn-primary btn-sm">
            <Menu className="w-5 h-5" />
            Menu
          </label>
        </div>

        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-56 md:w-56 lg:w-80  bg-primary text-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold  ">Dashboard</h2>
            <ThemeToggle></ThemeToggle>
          </div>
          <li>
            <NavLink to="/" className="flex gap-2 items-center">
              <Home size={18} /> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/my-profile" className="flex gap-2 items-center">
              <User size={18} /> My Profile
            </NavLink>
          </li>

          {/* Role-based items */}
          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/my-applications" className="flex gap-2 items-center">
                  <BookOpenCheck size={18} /> My Applications
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-reviews" className="flex gap-2 items-center">
                  <Star size={18} /> My Reviews
                </NavLink>
              </li>
            </>
          )}

          {role === "moderator" && (
            <>
              <li>
                <NavLink to="/dashboard/moderator/manage-scholarships" className="flex gap-2 items-center">
                  <ClipboardList size={18} /> Manage Scholarships
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/moderator/all-reviews" className="flex gap-2 items-center">
                  <Star size={18} /> All Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/moderator/all-applied-scholarships" className="flex gap-2 items-center">
                  <FileSearch size={18} /> All Applications
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/moderator/add-scholarships" className="flex gap-2 items-center">
                  <FilePlus size={18} /> Add Scholarship
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin/add-scholarships" className="flex gap-2 items-center">
                  <FilePlus size={18} /> Add Scholarship
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-scholarships" className="flex gap-2 items-center">
                  <ClipboardList size={18} /> Manage Scholarships
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/all-applied-scholarships" className="flex gap-2 items-center">
                  <FileSearch size={18} /> Manage Applications
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-users" className="flex gap-2 items-center">
                  <Users size={18} /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/all-reviews" className="flex gap-2 items-center">
                  <Star size={18} /> Manage Reviews
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
