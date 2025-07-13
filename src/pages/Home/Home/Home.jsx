import React from "react";
import Banner from "../Banner/Banner";
import TopScholarships from "../TopScholarships/TopScholarships";
import GetStarted from "../GetStarted/GetStarted";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <section className="container max-w-7xl mx-auto">
        <TopScholarships></TopScholarships>
      </section>
      <section className="container max-w-7xl mx-auto">
        <GetStarted></GetStarted>
      </section>
    </div>
  );
};

export default Home;
