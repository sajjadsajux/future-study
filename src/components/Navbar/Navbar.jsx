import React from "react";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../../hooks/ThemeToggle";
import FutureStudyLogo from "../shared/FutureStudyLogo";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // console.log("Logged out");
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
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>

      {user && (
        <>
          {/* Future role-based dashboard */}
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar   container max-w-7xl mx-auto px-0 ">
      <div className="navbar-start ">
        <div
          className="dropdown mr-2 md:mr-0
        "
        >
          <div tabIndex={0} role="button" className="  lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 md:h-8 w-5 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-primary  rounded-box w-36 z-10">
            {navItems}
          </ul>
        </div>
        <div>
          <FutureStudyLogo width={200} height={100} />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 text-sm md:text-base">{navItems}</ul>
      </div>

      <div className="navbar-end space-x-3 ">
        {user ? (
          <>
            <div className="flex items-center gap-2 ">
              <span className="text-base hidden md:block">{user.displayName || "User"}</span>
              {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-8 md:w-10 h-8 md:h-10 rounded-full border" />}
              <button onClick={handleLogOut} className="btn btn-secondary  btn-sm text-base rounded-lg">
                Logout
              </button>
            </div>
          </>
        ) : (
          <NavLink to="/login" className="btn btn-secondary  btn-sm text-base rounded-lg">
            Login
          </NavLink>
        )}
      </div>
      <div className="ml-2 mr-1 lg:mr-0">
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
};

export default Navbar;
