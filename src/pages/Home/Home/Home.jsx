import React from "react";
import Banner from "../Banner/Banner";
import TopScholarships from "../TopScholarships/TopScholarships";
import GetStarted from "../GetStarted/GetStarted";
import FeaturedUniversities from "../FeaturedUniversities/FeaturedUniversities";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0">
        <TopScholarships></TopScholarships>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0" id="getStarted">
        <GetStarted></GetStarted>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0">
        <FeaturedUniversities></FeaturedUniversities>
      </section>
    </div>
  );
};

export default Home;
