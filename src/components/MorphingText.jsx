import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MorphingText = ({ 
  texts = [], 
  className = "", 
  duration = 2000, 
  transitionDuration = 0.5,
  delay = 0 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (texts.length <= 1) return;

    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, transitionDuration * 1000);
    }, duration);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [texts.length, duration, transitionDuration, delay]);

  if (texts.length === 0) return null;
  if (texts.length === 1) return <span className={className}>{texts[0]}</span>;

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: transitionDuration,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            {texts[currentIndex]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MorphingText; 