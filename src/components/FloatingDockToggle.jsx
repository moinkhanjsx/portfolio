import React from 'react';
import { motion } from 'framer-motion';

const FloatingDockToggle = ({ isVisible, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full p-3 shadow-2xl border border-white/20 dark:border-gray-700/20 hover:bg-white dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label={isVisible ? "Hide floating dock" : "Show floating dock"}
      title={isVisible ? "Hide floating dock" : "Show floating dock"}
    >
      <motion.div
        animate={{ rotate: isVisible ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-6 h-6 text-amber-600 dark:text-amber-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </motion.div>
    </motion.button>
  );
};

export default FloatingDockToggle; 