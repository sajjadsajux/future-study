import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayOut = () => {
  return (
    <div>
      <nav className="sticky top-0 z-50  bg-primary text-white ">
        <Navbar></Navbar>
      </nav>
      <main className="">
        <Outlet></Outlet>
      </main>
      <footer className="bg-primary text-white">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayOut;
