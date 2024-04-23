/* #src/components/HeroSection.js */

import React from "react";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="hero flex justify-center items-center h-screen bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animated-bg">
          <div className="inner"></div>
          <div className="outer"></div>
        </div>
      </div>
      <style>{`
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, #1f2937, #1a202c 20%, #161b22 80%, #1a202c 100%);
          overflow: hidden;
        }

        .inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: animateBg 10s ease;
        }

        .inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) 14.9%, transparent 15%),
            radial-gradient(circle at 100% 100%, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) 14.9%, transparent 15%),
            radial-gradient(circle at 0% 100%, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) 14.9%, transparent 15%),
            radial-gradient(circle at 0% 0%, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) 14.9%, transparent 15%),
            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) 29.9%, transparent 30%);
          background-size: 400% 400%;
          background-position: 0% 50%;
          animation: animateBgRadials 12s ease;
        }
        @keyframes animateBg {
            0% {
                transform: rotate(0deg) scale(1);
                background: #1f2937; /* Start color */
            }
            50% {
                transform: rotate(30deg) scale(1.5);
                background: #374151; /* Mid color */
            }
            75% {
                transform: rotate(80deg) scale(1.2);
                background: #4b5563; /* Intermediate color */
            }
            95% {
                transform: rotate(180deg) scale(1.2);
                background: #6b7280; /* Almost black color */
            }
            100% {
                background: #1f2937; /* End color */
            }
        }

        @keyframes animateBgRadials {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* End of new animation styles */
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-full blur-3xl opacity-20 animate-spin-slow"></div>
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col items-center mb-8"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl font-bold mb-4 text-center text-white"
          >
            Create Personalized Roadmaps with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl mb-8 text-center text-white"
          >
            Discover the power of AI-generated roadmaps tailored to your
            learning goals.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300"
          >
            Get Started
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 10 }}
          className="mt-8"
        >
          <motion.svg
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
            <polyline points="7.5 19.79 7.5 14.6 3 12" />
            <polyline points="16.5 19.79 16.5 14.6 21 12" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
