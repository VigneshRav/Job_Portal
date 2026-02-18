import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useUser();
  const { getToken } = useAuth();

  // =============================
  // GLOBAL STATES
  // =============================
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(
    localStorage.getItem("companyToken") || null,
  );

  const [companyData, setCompanyData] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  // =============================
  // Fetch Jobs
  // =============================
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");

      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =============================
  // Fetch User Data
  // =============================
  const fetchUserData = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + "/api/users/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =============================
  // Fetch Applications
  // =============================
  const fetchUserApplications = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + "/api/users/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserApplications(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =============================
  // Effects
  // =============================
  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

  const value = {
    // recruiter modal
    showRecruiterLogin,
    setShowRecruiterLogin,

    // recruiter auth
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,

    // jobs + user
    jobs,
    setJobs,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserData,
    fetchUserApplications,

    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,

    backendUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
