import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import Footer from "../components/Footer";
import Calltoaction from "../components/Calltoaction";
import About from "../components/About";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);

      if (section) {
        const yOffset = -80;
        const y =
          section.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <JobListing />
      <Calltoaction />
      <Footer />
    </div>
  );
};

export default Home;
