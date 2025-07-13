import React from "react";
import { motion } from "framer-motion";
import TypingAnimation from "./TypingAnimation";
import MorphingText from "./MorphingText";

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 mx-auto overflow-x-hidden">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="inline-block min-w-[120px] sm:min-w-[140px] md:min-w-[160px]">
              <TypingAnimation 
                speed={100} 
                delay={0.5}
                className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent"
              >
                About Me
              </TypingAnimation>
            </span>
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              I am a passionate{" "}
              <span className="inline-block min-w-[140px] sm:min-w-[160px] md:min-w-[180px]">
                <MorphingText 
                  texts={[
                    "web developer",
                    "frontend engineer", 
                    "React specialist",
                    "UI/UX designer",
                    "problem solver",
                    "creative coder"
                  ]}
                  className="text-amber-600 dark:text-amber-400 font-semibold"
                  duration={3000}
                  transitionDuration={0.5}
                  delay={2000}
                />
              </span>
              {" "}with a strong foundation in modern web technologies. I specialize in creating{" "}
              <span className="inline-block min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
                <MorphingText 
                  texts={[
                    "beautiful",
                    "responsive", 
                    "accessible",
                    "performant",
                    "user-friendly",
                    "innovative"
                  ]}
                  className="text-amber-600 dark:text-amber-400 font-semibold"
                  duration={2500}
                  transitionDuration={0.4}
                  delay={4000}
                />
              </span>
              {" "}web applications that provide exceptional user experiences.
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              With expertise in{" "}
              <span className="inline-block min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
                <MorphingText 
                  texts={[
                    "React.js",
                    "JavaScript", 
                    "TypeScript",
                    "Tailwind CSS",
                    "Node.js",
                    "Next.js"
                  ]}
                  className="text-amber-600 dark:text-amber-400 font-semibold"
                  duration={2000}
                  transitionDuration={0.3}
                  delay={6000}
                />
              </span>
              , I bring ideas to life through clean, efficient code and{" "}
              <span className="inline-block min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
                <MorphingText 
                  texts={[
                    "intuitive",
                    "modern", 
                    "scalable",
                    "maintainable",
                    "robust",
                    "elegant"
                  ]}
                  className="text-amber-600 dark:text-amber-400 font-semibold"
                  duration={2200}
                  transitionDuration={0.4}
                  delay={8000}
                />
              </span>
              {" "}designs that stand out in today's digital landscape.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
              <motion.div
                className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-3 sm:px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-amber-700 dark:text-amber-300 font-medium text-sm sm:text-base">3+ Years Experience</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-3 sm:px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-amber-700 dark:text-amber-300 font-medium text-sm sm:text-base">50+ Projects</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-3 sm:px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-amber-700 dark:text-amber-300 font-medium text-sm sm:text-base">Always Learning</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-1 rounded-2xl shadow-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <motion.div
                    className="text-center p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">3+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">Years Experience</div>
                  </motion.div>
                  <motion.div
                    className="text-center p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">50+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">Projects Completed</div>
                  </motion.div>
                  <motion.div
                    className="text-center p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">15+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">Technologies</div>
                  </motion.div>
                  <motion.div
                    className="text-center p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">100%</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">Client Satisfaction</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
