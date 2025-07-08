import React from 'react';
import { motion } from 'framer-motion';
import MorphingText from './MorphingText';

const MorphingTextDemo = () => {
  const professionalTitles = [
    "Web Developer",
    "Frontend Engineer", 
    "React Specialist",
    "UI/UX Designer",
    "Full Stack Developer",
    "Problem Solver",
    "Creative Coder"
  ];

  const greetings = [
    "Hello",
    "Hi there",
    "Welcome",
    "Greetings",
    "Hey",
    "Good day",
    "Nice to meet you"
  ];

  const actions = [
    "Let's build",
    "Let's create",
    "Let's design",
    "Let's develop",
    "Let's innovate",
    "Let's collaborate"
  ];

  const qualities = [
    "Beautiful",
    "Responsive", 
    "Accessible",
    "Performant",
    "User-friendly",
    "Innovative"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <MorphingText 
              texts={greetings}
              className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent"
              duration={2000}
              transitionDuration={0.4}
            />
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
            I'm a{" "}
            <MorphingText 
              texts={professionalTitles}
              className="text-xl sm:text-2xl font-semibold text-amber-600 dark:text-amber-400"
              duration={2500}
              transitionDuration={0.5}
              delay={3000}
            />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              <MorphingText 
                texts={actions}
                className="text-2xl font-bold text-gray-900 dark:text-white"
                duration={3000}
                transitionDuration={0.6}
                delay={1000}
              />
              {" "}Something Amazing
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              I create{" "}
              <MorphingText 
                texts={qualities}
                className="text-lg font-semibold text-amber-600 dark:text-amber-400"
                duration={2200}
                transitionDuration={0.4}
                delay={2000}
              />
              {" "}web applications that provide exceptional user experiences.
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Technologies I Use
            </h3>
            <div className="space-y-4">
              <MorphingText 
                texts={[
                  "React.js & Next.js",
                  "JavaScript & TypeScript",
                  "Tailwind CSS & Styled Components",
                  "Node.js & Express",
                  "MongoDB & PostgreSQL",
                  "Git & GitHub"
                ]}
                className="text-lg font-semibold text-amber-600 dark:text-amber-400"
                duration={2800}
                transitionDuration={0.5}
                delay={1500}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to{" "}
            <MorphingText 
              texts={[
                "Start?",
                "Begin?",
                "Create?",
                "Build?",
                "Collaborate?",
                "Innovate?"
              ]}
              className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent"
              duration={2000}
              transitionDuration={0.4}
              delay={4000}
            />
          </h2>
          <motion.button
            className="bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <MorphingText 
              texts={[
                "Get Started",
                "Contact Me",
                "View Projects",
                "Let's Talk",
                "Start Project"
              ]}
              className="text-white font-semibold text-lg"
              duration={2500}
              transitionDuration={0.4}
              delay={5000}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default MorphingTextDemo; 