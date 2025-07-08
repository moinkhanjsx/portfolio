import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TypingAnimation from './TypingAnimation';
import MorphingText from './MorphingText';
import FloatingDock from './FloatingDock';
import { AnimatePresence } from 'framer-motion';

const ComponentShowcase = () => {
  const [activeSection, setActiveSection] = useState('typing');

  const showcaseItems = [
    {
      title: "Typing Animation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-full w-full text-neutral-500 dark:text-neutral-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      ),
      href: "#typing",
    },
    {
      title: "Morphing Text",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-full w-full text-neutral-500 dark:text-neutral-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      ),
      href: "#morphing",
    },
    {
      title: "Floating Dock",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-full w-full text-neutral-500 dark:text-neutral-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      ),
      href: "#dock",
    },
  ];

  const dockItems = [
    {
      title: "Home",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-full w-full text-neutral-500 dark:text-neutral-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      href: "#home",
    },
    {
      title: "About",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-full w-full text-neutral-500 dark:text-neutral-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      href: "#about",
    },
    {
      title: "Projects",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-full w-full text-neutral-500 dark:text-neutral-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      href: "#projects",
    },
    {
      title: "Contact",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-full w-full text-neutral-500 dark:text-neutral-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-.964 1.86l-7.5 5.25a2.25 2.25 0 01-2.572 0l-7.5-5.25a2.25 2.25 0 01-.964-1.86V6.75" />
        </svg>
      ),
      href: "#contact",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <motion.h1 
          className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TypingAnimation 
            speed={100} 
            delay={0.5}
            className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent"
          >
            Component Showcase
          </TypingAnimation>
        </motion.h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
          Explore the interactive components I've created for modern web experiences
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/20 dark:border-gray-700/20">
          <div className="flex space-x-2">
            {['typing', 'morphing', 'dock'].map((section) => (
              <motion.button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                  activeSection === section
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {activeSection === 'typing' && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Typing Animation
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Welcome Message:
                  </h3>
                  <div className="text-2xl text-amber-600 dark:text-amber-400">
                    <TypingAnimation speed={80} delay={1}>
                      Hello! I'm Moin Khan, a passionate web developer.
                    </TypingAnimation>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Professional Title:
                  </h3>
                  <div className="text-xl text-gray-700 dark:text-gray-300">
                    I am a <TypingAnimation speed={100} delay={3}>
                      Full Stack Developer & UI/UX Designer
                    </TypingAnimation>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'morphing' && (
            <motion.div
              key="morphing"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Morphing Text
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Professional Roles:
                  </h3>
                  <div className="text-2xl text-amber-600 dark:text-amber-400">
                    <MorphingText 
                      texts={[
                        "Web Developer",
                        "Frontend Engineer", 
                        "React Specialist",
                        "UI/UX Designer",
                        "Full Stack Developer",
                        "Problem Solver"
                      ]}
                      duration={2500}
                      transitionDuration={0.4}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Technologies:
                  </h3>
                  <div className="text-xl text-gray-700 dark:text-gray-300">
                    I specialize in <MorphingText 
                      texts={[
                        "React.js",
                        "JavaScript", 
                        "TypeScript",
                        "Tailwind CSS",
                        "Node.js",
                        "Next.js"
                      ]}
                      duration={2000}
                      transitionDuration={0.3}
                      delay={2000}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Call to Action:
                  </h3>
                  <div className="text-lg text-gray-600 dark:text-gray-400">
                    Ready to <MorphingText 
                      texts={[
                        "start?",
                        "begin?",
                        "create?",
                        "build?",
                        "collaborate?",
                        "innovate?"
                      ]}
                      duration={1800}
                      transitionDuration={0.3}
                      delay={4000}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'dock' && (
            <motion.div
              key="dock"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Floating Dock
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Hover over the dock items below to see the macOS-style magnification effect. 
                Each item scales smoothly and shows a tooltip with its title.
              </p>
              <div className="flex justify-center">
                <div className="bg-gray-100 dark:bg-gray-600 rounded-2xl p-4">
                  <FloatingDock
                    items={dockItems}
                    dockPosition="bottom"
                    className="relative"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Dock for Navigation */}
      <FloatingDock
        items={showcaseItems}
        mobileClassName="translate-y-20"
        dockPosition="bottom"
      />
    </div>
  );
};

export default ComponentShowcase; 