import React from "react";
import { motion } from "framer-motion";
import {
  FiTarget,
  FiEye,
  FiUsers,
  FiBriefcase,
  FiTrendingUp,
} from "react-icons/fi";

const About = () => {
  const companyLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  ];

  const stats = [
    { icon: FiBriefcase, number: "50K+", label: "Active Jobs" },
    { icon: FiUsers, number: "1M+", label: "Job Seekers" },
    { icon: FiTrendingUp, number: "95%", label: "Success Rate" },
  ];

  return (
    <section id="about">
      <div className="bg-white">
        {/* ================= HERO SECTION ================= */}
        <section className="py-14 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              About QuickHire
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-base md:text-lg text-white/90"
            >
              QuickHire connects talented professionals with innovative
              companies. Our mission is to simplify hiring and empower careers
              through technology-driven solutions.
            </motion.p>
          </div>
        </section>

        {/* ================= MISSION & VISION ================= */}
        <section className="py-12 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
            >
              <FiTarget className="text-blue-600 text-2xl mb-3" />
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To bridge the gap between job seekers and employers by providing
                a seamless, transparent, and efficient hiring platform that
                helps individuals find meaningful careers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
            >
              <FiEye className="text-indigo-600 text-2xl mb-3" />
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To become the most trusted global career platform where
                companies discover exceptional talent and professionals unlock
                their full potential.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Our Impact in Numbers
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
                >
                  <stat.icon className="text-blue-600 text-2xl mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-1">{stat.number}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRUSTED COMPANIES ================= */}
        <section className="py-12 max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Trusted By
            </p>
            <h3 className="text-sm text-gray-700">
              Innovative companies worldwide
            </h3>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {companyLogos.map((logo, index) => (
              <div
                key={index}
                className="w-16 h-10 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Company ${index + 1}`}
                  className="max-h-full max-w-full object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
