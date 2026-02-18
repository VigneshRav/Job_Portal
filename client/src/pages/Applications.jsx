import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  FileCheck,
  Edit,
  Download,
  Briefcase,
  Calendar,
  MapPin,
  FileClock,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Home,
  FileX,
} from "lucide-react";

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const context = useContext(AppContext);
  const { backendUrl, userData, userApplications, fetchUserData } = context;

  const updateResume = async () => {
    try {
      if (!resume) return toast.error("Please select a resume file.");

      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();

      const response = await fetch(`${backendUrl}/api/users/update-resume`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else toast.error(data.message);
    } catch {
      toast.error("Failed to update resume.");
    }

    setIsEdit(false);
    setResume(null);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Accepted":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: CheckCircle,
        };
      case "Rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-600",
          border: "border-red-200",
          icon: XCircle,
        };
      default:
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: AlertCircle,
        };
    }
  };

  const stats = {
    total: userApplications?.length || 0,
    accepted:
      userApplications?.filter((app) => app.status === "Accepted").length || 0,
    pending:
      userApplications?.filter(
        (app) =>
          !app.status ||
          app.status === "Pending" ||
          (app.status !== "Accepted" && app.status !== "Rejected"),
      ).length || 0,
    rejected:
      userApplications?.filter((app) => app.status === "Rejected").length || 0,
  };

  const filteredApplications =
    selectedStatus === "all"
      ? userApplications
      : userApplications?.filter((app) =>
          selectedStatus === "pending"
            ? !app.status ||
              app.status === "Pending" ||
              (app.status !== "Accepted" && app.status !== "Rejected")
            : app.status?.toLowerCase() === selectedStatus,
        ) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-50 flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition"
      >
        <Home className="w-4 h-4 mr-2" />
        Home
      </button>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Heading */}
        <div className="text-center mb-12 mt-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Application Dashboard
          </h1>
          <p className="text-gray-500">
            Track your career journey with precision
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Total Applications",
              value: stats.total,
              icon: FileText,
              color: "text-gray-700",
            },
            {
              label: "Accepted",
              value: stats.accepted,
              icon: FileCheck,
              color: "text-emerald-600",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: FileClock,
              color: "text-amber-600",
            },
            {
              label: "Rejected",
              value: stats.rejected,
              icon: FileX,
              color: "text-red-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Resume Section */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 mb-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Resume Management
          </h3>
          <p className="text-gray-500 mb-6">Keep your profile updated</p>

          {isEdit || (userData && !userData.resume) ? (
            <div className="flex gap-4 flex-wrap">
              <label className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <Download className="w-4 h-4 inline mr-2" />
                {resume ? resume.name : "Select Resume"}
                <input
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </label>

              <button
                onClick={updateResume}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Resume
              </button>
            </div>
          ) : (
            <div className="flex gap-4 flex-wrap">
              <a
                href={`https://docs.google.com/gview?url=${encodeURIComponent(
                  userData?.resume,
                )}&embedded=true`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                <Eye className="w-4 h-4 inline mr-2" />
                View Resume
              </a>

              <button
                onClick={() => setIsEdit(true)}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <Edit className="w-4 h-4 inline mr-2" />
                Update Resume
              </button>
            </div>
          )}
        </div>

        {/* Applications Section */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Application Tracker
          </h3>

          {filteredApplications?.length > 0 ? (
            <div className="space-y-4">
              {filteredApplications.map((job, index) => {
                const statusConfig = getStatusConfig(job.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={job.id || index}
                    className="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {job.jobId?.title || "N/A"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {job.companyId?.name}
                      </p>
                      <div className="flex text-xs text-gray-400 mt-1 gap-4">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.jobId?.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {moment(job.date).format("MMM DD, YYYY")}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {job.status || "Pending"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-10 h-10 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">
                No {selectedStatus !== "all" && selectedStatus} applications
                found.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Applications;
