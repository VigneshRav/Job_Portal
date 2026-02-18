import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBookmark, FiMapPin, FiBriefcase, FiClock } from "react-icons/fi";
import { IndianLocations } from "../assets/assets.js";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const stripHtmlTags = (html) => {
    return html ? html.replace(/<[^>]*>?/gm, "") : "No description provided";
  };

  const getTimePassed = (date) => {
    if (!date) return "Recently";

    const now = new Date();
    const postedDate = new Date(date);
    const diff = Math.floor((now - postedDate) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
    return `${Math.floor(diff / 31536000)}y ago`;
  };

  const formatSalary = (salary, location) => {
    const isIndian = IndianLocations.includes(location);

    if (!salary) return "Not disclosed";

    if (isIndian) {
      // Salary stored as LPA (ex: 9 → 9 LPA)
      return `₹ ${salary} LPA`;
    } else {
      // Salary stored as full USD amount (ex: 75000)
      return `$ ${salary.toLocaleString()} PA`;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="relative h-full flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        {/* NEW Ribbon */}
        {getTimePassed(job.date) === "Just now" && (
          <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full font-semibold animate-pulse z-10">
            NEW
          </span>
        )}

        {/* HEADER */}
        <div className="p-5 flex justify-between items-start">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl border bg-gray-50 overflow-hidden">
              <img
                src={job.companyId?.image || "/default-company.png"}
                alt="logo"
                className="object-contain w-10 h-10"
              />
            </div>

            <div className="flex-1">
              {/* ✅ FULL TITLE VISIBLE */}
              <h3 className="text-lg font-semibold text-gray-800 break-words leading-snug">
                {job.title || "Job Title"}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {job.companyId?.name || "Company"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full text-lg transition ${
              isSaved
                ? "text-indigo-600"
                : "text-gray-400 hover:text-indigo-600"
            }`}
          >
            <FiBookmark />
          </button>
        </div>

        {/* TAGS */}
        <div className="px-5 flex flex-wrap gap-2 text-xs font-medium">
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
            <FiMapPin size={12} /> {job.location || "Remote"}
          </span>

          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
            {formatSalary(job.salary, job.location)}
          </span>

          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 text-pink-600">
            <FiBriefcase size={12} /> {job.level || "Intermediate"}
          </span>

          {job.type && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 text-orange-600">
              <FiClock size={12} /> {job.type}
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="px-5 pt-4 flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3 min-h-[60px]">
            {stripHtmlTags(job.description)}
          </p>
        </div>

        {/* FOOTER */}
        <div className="px-5 py-4 border-t bg-gray-50 flex justify-between items-center mt-auto">
          <div className="text-xs text-gray-500">
            <div>Posted</div>
            <div className="font-medium text-gray-700">
              {getTimePassed(job.date)}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/apply-job/${job._id}`)}
              className="px-4 py-2 text-xs font-medium border border-indigo-500 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
            >
              Learn More
            </button>

            <button
              onClick={() => navigate(`/apply-job/${job._id}`)}
              className="px-4 py-2 text-xs font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
