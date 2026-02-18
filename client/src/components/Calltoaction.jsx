import React, { useState } from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  return (
    <section className="w-full bg-white py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="px-6 md:px-20"
      >
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-green-300 rounded-3xl p-10 md:p-16 shadow-xl border border-blue-100"
        >
          {/* Left Content */}
          <div className="lg:col-span-7">
            <h2 className="font-bold text-4xl md:text-5xl text-blue-600 leading-tight mb-6">
              Join the <span className="text-yellow-400">QuickHire</span>{" "}
              Community
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl">
              Stay ahead with the latest job opportunities, career insights, and
              exclusive professional resources delivered straight to your inbox.
            </p>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-xl border border-slate-300 bg-white shadow-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 text-slate-700 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your professional email"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-md ${
                  submitted
                    ? "bg-green-600"
                    : "bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 hover:from-purple-500 hover:to-indigo-500"
                }`}
              >
                {submitted ? "Subscribed Successfully!" : "Subscribe Now"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
