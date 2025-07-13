import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside className="max-w-sm space-y-3">
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current text-primary">
            <path d="M22.672 15.226l-2.432.811..." /> {/* Truncated for brevity */}
          </svg>
          <span className="text-xl font-bold">ACME Industries Ltd.</span>
        </div>
        <p className="text-sm text-gray-500">Providing reliable tech since 1992</p>
        <div className="flex gap-4 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF className="text-xl hover:text-blue-600 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="text-xl hover:text-sky-400 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="text-xl hover:text-pink-500 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedinIn className="text-xl hover:text-blue-700 transition" />
          </a>
        </div>
      </aside>

      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>

      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>

      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
