import React from "react";
import { motion } from "framer-motion";
import TypingAnimation from "./TypingAnimation";
import MorphingText from "./MorphingText";

const Home = () => (
  <section id="home" className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-amber-400 to-amber-100 dark:from-gray-900 dark:to-gray-800 w-full max-w-full px-2 sm:px-0 relative">
    {/* Animated SVG background */}
    <motion.img 
      src="/vite.svg" 
      alt="Decorative background element" 
      className="absolute top-0 left-0 w-40 sm:w-64 opacity-10 pointer-events-none select-none" 
      style={{zIndex:0}}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
    <motion.img 
      src="/vite.svg" 
      alt="Decorative background element" 
      className="absolute bottom-0 right-0 w-32 sm:w-52 opacity-10 pointer-events-none select-none" 
      style={{zIndex:0}}
      animate={{ rotate: -360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
    
    <motion.h1 
      id="home-heading"
      className="text-4xl sm:text-6xl font-extrabold mb-3 sm:mb-4 text-center relative z-10 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-lg"
    >
      <span className="inline-block min-w-[120px]">
        <TypingAnimation 
          speed={150} 
          delay={0.5}
          className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-clip-text text-transparent"
        >
          Moin Khan
        </TypingAnimation>
      </span>
    </motion.h1>
    
    <motion.p 
      className="text-lg sm:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center relative z-10"
    >
      <span className="inline-block min-w-[220px]">
        <MorphingText 
          texts={[
            "Web Developer",
            "Frontend Engineer", 
            "React Specialist",
            "UI/UX Designer",
            "Full Stack Developer",
            "Problem Solver",
            "Creative Coder"
          ]}
          className="text-lg sm:text-2xl text-gray-700 dark:text-gray-300 font-semibold"
          duration={2500}
          transitionDuration={0.4}
          delay={0}
        />
      </span>
    </motion.p>
    
    <div 
      className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
      role="group"
      aria-label="Main action buttons"
    >
      <motion.a 
        href="#projects" 
        className="px-6 sm:px-8 py-3 sm:py-4 bg-amber-600 text-white rounded-xl shadow-xl hover:bg-amber-700 transition text-lg sm:text-xl font-bold tracking-wide transform focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="View my projects"
      >
        View My Work
      </motion.a>
      <motion.a 
        href="/resume-moin-khan.pdf" 
        download 
        className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-700 border-2 border-amber-600 rounded-xl shadow-xl hover:bg-amber-50 hover:text-amber-900 transition text-lg sm:text-xl font-bold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="Download my resume (PDF file)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3M4 20h16" />
        </svg>
        Download Resume
      </motion.a>
    </div>
    
    {/* Social links */}
    <div 
      className="flex gap-6 mt-8 relative z-10"
      role="group"
      aria-label="Social media links"
    >
      <motion.a 
        href="https://github.com/moinkhanjsx" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded p-2" 
        title="GitHub"
        whileHover={{ scale: 1.2, y: -3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="Visit my GitHub profile (opens in new tab)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
        </svg>
      </motion.a>
      <motion.a 
        href="mailto:moinkhan.jsx@gmail.com" 
        className="text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded p-2" 
        title="Email"
        whileHover={{ scale: 1.2, y: -3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="Send me an email"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-.964 1.86l-7.5 5.25a2.25 2.25 0 0 1-2.572 0l-7.5-5.25a2.25 2.25 0 0 1-.964-1.86V6.75" />
        </svg>
      </motion.a>
      <motion.a 
        href="https://linkedin.com/in/your-linkedin" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded p-2" 
        title="LinkedIn"
        whileHover={{ scale: 1.2, y: -3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="Visit my LinkedIn profile (opens in new tab)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
        </svg>
      </motion.a>
    </div>
  </section>
);

export default Home;
