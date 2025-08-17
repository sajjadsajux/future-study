import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import TopScholarships from "../TopScholarships/TopScholarships";
import GetStarted from "../GetStarted/GetStarted";
import FeaturedUniversities from "../FeaturedUniversities/FeaturedUniversities";
import SuccessStories from "../SuccessReviews/SuccessReviews";
import PlatformStats from "../PlatformStats.jsx/PlatformStats";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";
import FAQSection from "../FAQSection/FAQSection";
import Aos from "aos";
import "aos/dist/aos.css";
import Newsletter from "../Newsletter/Newsletter";

const Home = () => {
  useTitle("Home || FutureStudy");
  useScrollToTop();

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div>
      <Banner></Banner>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0" data-aos="fade-up">
        <TopScholarships></TopScholarships>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0" data-aos="zoom-in-up">
        <PlatformStats></PlatformStats>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0" data-aos="fade-up">
        <FeaturedUniversities></FeaturedUniversities>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0" id="successStories" data-aos="fade-left">
        <SuccessStories></SuccessStories>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0" id="getStarted" data-aos="fade-right">
        <GetStarted></GetStarted>
      </section>

      <section className="container max-w-7xl mx-auto px-2 lg:px-0" data-aos="flip-up">
        <FAQSection></FAQSection>
      </section>
      <section className="container max-w-7xl mx-auto px-2 lg:px-0" data-aos="flip-up">
        <Newsletter></Newsletter>
      </section>
    </div>
  );
};

export default Home;
