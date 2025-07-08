import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = ({ 
  children, 
  className = "", 
  speed = 100, 
  delay = 0,
  cursor = true,
  repeat = false 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const text = typeof children === 'string' ? children : children.props?.children || children;

  useEffect(() => {
    if (typeof text !== 'string') return;

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsComplete(true);
        if (repeat) {
          setTimeout(() => {
            setDisplayText('');
            setCurrentIndex(0);
            setIsComplete(false);
          }, 2000);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, repeat]);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setCurrentIndex(0);
    }, delay);

    return () => clearTimeout(initialTimer);
  }, [delay]);

  if (typeof text !== 'string') {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={className}>
      {displayText}
      {cursor && !isComplete && (
        <motion.span
          className="inline-block w-0.5 h-full bg-current ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </span>
  );
};

export default TypingAnimation; 