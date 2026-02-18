import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/quickhire_llp_logo.jpeg";
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 90 },
    },
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-purple-900 to-indigo-950 pt-14">
      {/* Background blur */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-600 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* COLUMN 1 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src={logo}
                    alt="QuickHire Logo"
                    className="h-12 rounded-xl w-auto object-contain"
                  />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    QuickHire
                  </span>
                </div>

                <p className="text-gray-400 leading-relaxed">
                  QuickHire connects ambitious professionals with
                  forward-thinking companies through a powerful hiring platform
                  designed to help job seekers grow and recruiters hire smarter.
                </p>
              </div>

              {/* Social Icons aligned bottom */}
              <div className="flex gap-4 mt-8">
                {[FaTwitter, FaLinkedinIn, FaGithub, FaInstagram].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="/"
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      <Icon />
                    </a>
                  ),
                )}
              </div>
            </motion.div>

            {/* COLUMN 2 */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-white mb-6 relative inline-block">
                Job Seekers
                <span className="absolute left-0 -bottom-2 w-12 h-0.5 bg-blue-500"></span>
              </h3>
              <ul className="space-y-4 mt-6">
                {[
                  "Resume Builder",
                  "Explore Opportunities",
                  "Career Guidance",
                  "Interview Preparation",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COLUMN 3 */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-white mb-6 relative inline-block">
                Resources
                <span className="absolute left-0 -bottom-2 w-12 h-0.5 bg-blue-500"></span>
              </h3>
              <ul className="space-y-4 mt-6">
                {["FAQs", "Documentation", "User Guide", "Career Blog"].map(
                  (item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </motion.div>

            {/* COLUMN 4 */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-white mb-6 relative inline-block">
                Support
                <span className="absolute left-0 -bottom-2 w-12 h-0.5 bg-blue-500"></span>
              </h3>
              <ul className="space-y-4 mt-6">
                {[
                  "Customer Support",
                  "Privacy Policy",
                  "Terms & Conditions",
                  "Cookies Policy",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Horizontal Line */}
        <div className="border-t border-gray-700 mt-14"></div>

        {/* Bottom Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 text-gray-500 text-sm">
          {/* Left */}
          <div>
            © {new Date().getFullYear()} QuickHire. All rights reserved.
          </div>

          {/* Right */}
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/" className="hover:text-white transition-colors">
              Sitemap
            </a>
            <a href="/" className="hover:text-white transition-colors">
              Accessibility
            </a>
            <a href="/" className="hover:text-white transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
    </footer>
  );
};

export default Footer;
