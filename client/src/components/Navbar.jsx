import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Briefcase, Menu, X, Home, Info, Search } from "lucide-react";
import logo from "../assets/quickhire_llp_logo.jpeg";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { setShowRecruiterLogin } = useContext(AppContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
const location = useLocation();


  // Scroll to section
  // const scrollToSection = (id) => {
  //   setMobileOpen(false);
  //   const section = document.getElementById(id);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const scrollToSection = (id) => {
  setMobileOpen(false);

  // If NOT on homepage → navigate with state
  if (location.pathname !== "/") {
    navigate("/", { state: { scrollTo: id } });
    return;
  }

  // Already on homepage → scroll immediately
  const section = document.getElementById(id);
  if (!section) return;

  const yOffset = -80;
  const y =
    section.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};


  const navLinks = [
    { name: "Home", id: "home", icon: <Home size={18} /> },
    { name: "About Us", id: "about", icon: <Info size={18} /> },
    { name: "Browse Jobs", id: "jobs", icon: <Search size={18} /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white backdrop-blur-xl shadow-md">
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={logo}
              alt="QuickHire Logo"
              className="h-12 md:h-12 w-auto object-contain"
            />
            <span className="text-3xl md:text-2xl font- font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent whitespace-nowrap">
              QuickHire
            </span>
          </div>

          {/* Center Nav (Desktop + Tablet properly spaced) */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.id)}
                className="flex items-center gap-2 hover:text-blue-600 transition relative group"
              >
                {link.icon}
                {link.name}

                {/* Underline animation */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-teal-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-5">
            {user ? (
              <>
                <Link
                  to="/applications"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <Briefcase size={18} />
                  My Jobs
                </Link>

                <span className="text-sm text-gray-500">
                  Hi, {user.firstName}
                </span>

                <UserButton />
              </>
            ) : (
              <>
                {/* Recruiter Button (Separate Style) */}
                <button
                  onClick={() => setShowRecruiterLogin(true)}
                  className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 font-medium"
                >
                  Recruiter Portal
                </button>

                {/* Get Started */}
                <button
                  onClick={() => openSignIn()}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-5 py-2 rounded-lg shadow-md transition"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-gray-700"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-md border-t">
          <div className="px-6 py-4 space-y-4">
            {/* Nav Links */}
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.id)}
                className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600 transition"
              >
                {link.icon}
                {link.name}
              </button>
            ))}

            <hr />

            {user ? (
              <>
                <Link
                  to="/applications"
                  onClick={() => setMobileOpen(false)}
                  className="block hover:text-blue-600"
                >
                  My Jobs
                </Link>

                <div className="flex items-center gap-3">
                  <UserButton />
                  <span className="text-sm text-gray-500">
                    Hi, {user.firstName}
                  </span>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowRecruiterLogin(true);
                    setMobileOpen(false);
                  }}
                  className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  Recruiter Portal
                </button>

                <button
                  onClick={() => {
                    openSignIn();
                    setMobileOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-lg"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
