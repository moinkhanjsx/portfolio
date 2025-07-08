import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingDock = ({ 
  items = [], 
  className = "", 
  mobileClassName = "",
  dockPosition = "bottom" 
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getDockPosition = () => {
    switch (dockPosition) {
      case "top":
        return "top-4";
      case "left":
        return "left-4 top-1/2 -translate-y-1/2";
      case "right":
        return "right-4 top-1/2 -translate-y-1/2";
      default:
        return "bottom-4";
    }
  };

  const getDockLayout = () => {
    switch (dockPosition) {
      case "left":
      case "right":
        return "flex-col";
      default:
        return "flex-row";
    }
  };

  const getItemSpacing = () => {
    switch (dockPosition) {
      case "left":
      case "right":
        return "mb-2";
      default:
        return "mr-2";
    }
  };

  const getHoverScale = (index) => {
    if (hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    const maxScale = 1.5;
    const minScale = 1;
    
    if (distance === 0) return maxScale;
    if (distance === 1) return 1.3;
    if (distance === 2) return 1.1;
    return minScale;
  };

  const getHoverZIndex = (index) => {
    if (hoveredIndex === null) return 0;
    return hoveredIndex === index ? 10 : 0;
  };

  return (
    <div className={`fixed ${getDockPosition()} z-50 ${className} ${mobileClassName}`}>
      <motion.div
        className={`flex ${getDockLayout()} items-center justify-center`}
        initial={{ opacity: 0, y: dockPosition === "bottom" ? 50 : dockPosition === "top" ? -50 : 0, x: dockPosition === "left" ? -50 : dockPosition === "right" ? 50 : 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20 dark:border-gray-700/20">
          <div className={`flex ${getDockLayout()} items-center`}>
            {items.map((item, index) => (
              <motion.div
                key={index}
                className={`relative ${getItemSpacing()} last:mr-0 last:mb-0`}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.a
                  href={item.href}
                  className="block p-3 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-transparent"
                  style={{ zIndex: getHoverZIndex(index) }}
                  aria-label={item.title}
                >
                  <motion.div
                    className="w-8 h-8 flex items-center justify-center"
                    animate={{
                      scale: getHoverScale(index),
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {item.icon}
                  </motion.div>
                </motion.a>
                
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className={`absolute ${
                        dockPosition === "bottom" ? "bottom-full mb-2" :
                        dockPosition === "top" ? "top-full mt-2" :
                        dockPosition === "left" ? "left-full ml-2" :
                        "right-full mr-2"
                      } left-1/2 transform -translate-x-1/2 z-20`}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                        {item.title}
                        <div className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-100 transform rotate-45 ${
                          dockPosition === "bottom" ? "top-full -mt-1" :
                          dockPosition === "top" ? "bottom-full -mb-1" :
                          dockPosition === "left" ? "right-full -mr-1" :
                          "left-full -ml-1"
                        } left-1/2 -translate-x-1/2`}></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingDock; 