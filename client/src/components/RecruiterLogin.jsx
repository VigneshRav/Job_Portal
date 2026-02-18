import React, { useContext, useState, useRef } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  X,
  Upload,
  Github,
  Linkedin,
} from "lucide-react";

const RecruiterLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const dragAreaRef = useRef(null);

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  const checkPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length > 6) score += 1;
    if (pass.length > 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dragAreaRef.current?.classList.add("border-blue-500", "bg-blue-50");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragAreaRef.current?.classList.remove("border-blue-500", "bg-blue-50");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragAreaRef.current?.classList.remove("border-blue-500", "bg-blue-50");

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      toast.error("Please upload an image file");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmited) {
      if (passwordStrength < 3) {
        toast.warning("Please use a stronger password for better security");
        return;
      }
      return setIsTextDataSubmited(true);
    }

    setIsLoading(true);

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/company/login", {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          toast.success("Login successful!");
          setTimeout(() => {
            setShowRecruiterLogin(false);
            navigate("/dashboard");
          }, 1000);
        } else toast.error(data.message);
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);
        if (image) formData.append("image", image);

        const { data } = await axios.post(
          backendUrl + "/api/company/register",
          formData,
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          toast.success("Account created!");
          setTimeout(() => {
            setShowRecruiterLogin(false);
            navigate("/dashboard");
          }, 1000);
        } else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setImage(null);
    setIsTextDataSubmited(false);
    setPasswordStrength(0);
  };

  const switchMode = (newState) => {
    setState(newState);
    resetForm();
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 350, damping: 25 },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm overflow-y-auto"
      initial="hidden"
      animate="visible"
      variants={overlayVariants}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <motion.div
          className="relative w-full max-w-md"
          variants={modalVariants}
        >
          <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl">
            {/* Header text now at top */}
            <div className="px-8 pt-2 pb-3">
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
                {state === "Login"
                  ? "Welcome Back"
                  : isTextDataSubmited
                    ? "Add Your Brand"
                    : "Join Our Platform"}
              </h1>
              <p className="text-sm text-center text-gray-500">
                {state === "Login"
                  ? "Access your recruiter dashboard"
                  : isTextDataSubmited
                    ? "Upload your company logo to complete setup"
                    : "Create an account to find top talent"}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={`${state}-${isTextDataSubmited}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
                onSubmit={onSubmitHandler}
                className="px-8 pb-6 space-y-4"
              >
                {state === "Sign Up" && isTextDataSubmited ? (
                  <div className="flex flex-col items-center my-6">
                    <div
                      ref={dragAreaRef}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className="relative w-40 h-40 mb-4 overflow-hidden rounded-full border-2 border-dashed border-gray-300 transition-all duration-300 group cursor-pointer hover:border-blue-400 bg-gray-50 flex items-center justify-center"
                    >
                      {image ? (
                        <div className="relative w-full h-full">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Company Logo Preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <label className="flex flex-col items-center cursor-pointer">
                          <Upload size={28} />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              e.target.files[0] && setImage(e.target.files[0])
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {state !== "Login" && (
                      <div className="space-y-1.5">
                        <label
                          htmlFor="company-name"
                          className="text-sm font-medium text-gray-700 ml-1 flex items-center gap-1.5"
                        >
                          <User size={14} className="text-gray-500" />
                          Company Name
                        </label>
                        <input
                          id="company-name"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          placeholder="Enter your company name"
                          required
                        />
                      </div>
                    )}
                    <div className="space-y-1.5">
                      {" "}
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 ml-1 flex items-center gap-1.5"
                      >
                        <Mail size={14} className="text-gray-500" />
                        Email Address
                      </label>
                      <input
                        id="email"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 ml-1 flex items-center gap-1.5"
                      >
                        <Lock size={14} className="text-gray-500" />
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                          value={password}
                          onChange={handlePasswordChange}
                          type={showPassword ? "text" : "password"}
                          placeholder={
                            state === "Login"
                              ? "Enter your password"
                              : "Create a strong password"
                          }
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"
                >
                  {isLoading
                    ? "Processing..."
                    : state === "Login"
                      ? "Sign In"
                      : isTextDataSubmited
                        ? "Create Account"
                        : "Continue"}
                </button>
              </motion.form>
            </AnimatePresence>

            <div className="pb-4 bg-gray-50 border-t border-gray-100 rounded-b-3xl">
              <p className="text-sm text-center text-gray-600">
                {state === "Login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={() =>
                    switchMode(state === "Login" ? "Sign Up" : "Login")
                  }
                  className="ml-1 font-medium text-blue-600"
                >
                  {state === "Login" ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>

            <button
              onClick={() => setShowRecruiterLogin(false)}
              className="absolute top-4 right-4"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecruiterLogin;
