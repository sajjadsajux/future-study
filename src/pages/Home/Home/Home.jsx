import React from "react";
import Banner from "../Banner/Banner";
import TopScholarships from "../TopScholarships/TopScholarships";
import GetStarted from "../GetStarted/GetStarted";
import FeaturedUniversities from "../FeaturedUniversities/FeaturedUniversities";
import SuccessStories from "../SuccessReviews/SuccessReviews";
import PlatformStats from "../PlatformStats.jsx/PlatformStats";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";
import FAQSection from "../FAQSection/FAQSection";

const Home = () => {
  useTitle("Home || FutureStudy");
  useScrollToTop();
  return (
    <div>
      <Banner></Banner>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0">
        <TopScholarships></TopScholarships>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0">
        <PlatformStats></PlatformStats>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0">
        <FeaturedUniversities></FeaturedUniversities>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0" id="successStories">
        <SuccessStories></SuccessStories>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0" id="getStarted">
        <GetStarted></GetStarted>
      </section>

      <section className="container max-w-7xl mx-auto px-2 lg:px-0">
        <FAQSection></FAQSection>
      </section>
    </div>
  );
};

export default Home;
