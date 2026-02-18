import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import bgimage from "../assets/bg-image-main.jpg";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiArrowRight } from "react-icons/fi";
import { FiBriefcase, FiUsers, FiTrendingUp } from "react-icons/fi";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const [activeTag, setActiveTag] = useState(null);

  const popularTags = [
    "Developer",
    "Designer",
    "Marketing",
    "Remote",
    "Manager",
  ];

  const stats = [
    { icon: FiBriefcase, number: "50K+", label: "Active Jobs" },
    { icon: FiUsers, number: "1M+", label: "Job Seekers" },
    { icon: FiTrendingUp, number: "95%", label: "Success Rate" },
  ];

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    if (titleRef.current) {
      titleRef.current.value = tag;
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    setSearchFilter({
      title: titleRef.current?.value || "",
      location: locationRef.current?.value || "",
    });
    setIsSearched(true);
  };

  return (
    <section id="home">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={bgimage}
              alt="Hero Background"
              className="w-full h-full object-cover object-center"
            />
            {/* Strong Dark Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-16 md:py-20">
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Find Your <span className="text-yellow-400">Dream Job</span>
              <br />
              With QuickHire
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10"
            >
              Your next big career move starts here. Explore thousands of job
              opportunities and take control of your future.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 mb-10"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-white/90"
                >
                  <stat.icon className="text-yellow-400 text-xl" />
                  <span className="font-bold text-xl">{stat.number}</span>
                  <span className="text-xl">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Search Form */}
            <motion.form
              onSubmit={onSearch}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                {/* Job Title */}
                <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <FiSearch className="text-gray-400 text-xl mr-3" />
                  <input
                    type="text"
                    ref={titleRef}
                    placeholder="Job title or keywords"
                    className="w-full text-lg outline-none placeholder-gray-400"
                    defaultValue={activeTag || ""}
                  />
                </div>

                {/* Location */}
                <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <FiMapPin className="text-gray-400 text-xl mr-3" />
                  <input
                    type="text"
                    ref={locationRef}
                    placeholder="Location or remote"
                    className="w-full text-lg outline-none placeholder-gray-400"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 font-semibold text-lg flex items-center justify-center transition-all duration-300"
                >
                  Search Jobs
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            </motion.form>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-white/80"
            >
              <span className="mr-4 text-lg font-medium">
                Popular Searches
              </span>
              <div className="flex flex-wrap justify-center gap-3 mt-3">
                {popularTags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => handleTagClick(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTag === tag
                        ? "bg-yellow-400 text-black"
                        : "bg-white/20 hover:bg-white/30 text-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </section>
  );
};

export default Hero;
