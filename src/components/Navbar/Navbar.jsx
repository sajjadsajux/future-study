import React from "react";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarship">All Scholarship</NavLink>
      </li>
      {user && (
        <>
          {/* Future role-based dashboard */}
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
            {navItems}
          </ul>
        </div>
        <NavLink to="/" className="text-xl font-bold">
          FutureStudy
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end space-x-3">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <span className="font-medium">{user.displayName || "User"}</span>
              {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border" />}
              <button onClick={handleLogOut} className="btn btn-secondary text-black btn-sm">
                Log Out
              </button>
            </div>
          </>
        ) : (
          <NavLink to="/login" className="btn btn-secondary text-black btn-sm">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
