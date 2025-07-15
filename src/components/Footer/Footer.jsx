import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import FutureStudyLogo from "../shared/FutureStudyLogo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="bg-primary text-base-100 py-10">
      <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-7 gap-8 justify-between">
        {/* Logo + Slogan */}
        <div className="col-span-2">
          <FutureStudyLogo width={200} />
          <p className="mt-2 text-sm">Fueling Ambitions Through Scholarships</p>
        </div>

        {/* Navigation Links */}
        <div className="col-span-2">
          <h3 className="footer-title">Navigation</h3>
          <ul className="space-y-2">
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
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

        <div className="col-span-2">
          <h3 className="footer-title">Company</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/about-us">About Us</NavLink>
            </li>
          </ul>
        </div>
        {/* Social + Company Links */}
        <div className="">
          <h3 className="footer-title">Follow Us</h3>
          <p className="text-sm mb-2">Stay connected with us through social platforms</p>
          <div className="flex gap-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-xl hover:text-blue-500 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-xl hover:text-sky-400 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="text-xl hover:text-pink-400 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="text-xl hover:text-blue-700 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t pt-4 text-center text-sm text-base-100/80">© {new Date().getFullYear()} FutureStudy. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
