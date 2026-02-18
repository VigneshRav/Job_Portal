import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary";
import { clerkClient } from "@clerk/express";

// ==============================
// Get User Data (Auto Create)
// ==============================
export const getUserData = async (req, res) => {
  try {
    const clerkId = req.auth.userId;

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    let user = await User.findById(clerkId);

    // 🔥 If user does not exist in Mongo, fetch from Clerk
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);

      const name =
        clerkUser.firstName && clerkUser.lastName
          ? `${clerkUser.firstName} ${clerkUser.lastName}`
          : clerkUser.username || "User";

      const email = clerkUser.emailAddresses[0]?.emailAddress || "";

      const image = clerkUser.imageUrl || "";

      user = await User.create({
        _id: clerkId,
        name,
        email,
        image,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get User Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Apply For Job
// ==============================
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.auth.userId;

    if (!jobId) {
      return res.json({
        success: false,
        message: "Job ID is required",
      });
    }

    const isAlreadyApplied = await JobApplication.findOne({
      userId,
      jobId,
    });

    if (isAlreadyApplied) {
      return res.json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.json({
      success: true,
      message: "Applied Successfully",
    });
  } catch (error) {
    console.error("Apply Job Error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get User Applications
// ==============================
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location level salary")
      .sort({ date: -1 });

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Applications Error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Resume
// ==============================
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.json({
        success: false,
        message: "No file uploaded",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 Upload as RAW (important for PDF)
    const uploadResult = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "raw",
      folder: "resumes",
    });

    user.resume = uploadResult.secure_url;
    await user.save();

    return res.json({
      success: true,
      message: "Resume Updated Successfully",
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
