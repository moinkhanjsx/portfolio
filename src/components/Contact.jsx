import React from "react";
import { motion } from "framer-motion";
import TypingAnimation from "./TypingAnimation";
import MorphingText from "./MorphingText";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll just show an alert
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    
    // You can replace this with actual form submission logic
    console.log('Form submitted:', data);
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset the form
    e.target.reset();
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 mx-auto overflow-x-hidden">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="inline-block min-w-[140px] sm:min-w-[160px] md:min-w-[180px]">
              <TypingAnimation 
                speed={100} 
                delay={0.5}
                className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent"
              >
                Get In Touch
              </TypingAnimation>
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            <span className="inline-block min-w-[240px] sm:min-w-[260px] md:min-w-[280px]">
              <MorphingText 
                texts={[
                  "Ready to start a project?",
                  "Have a question?",
                  "Want to collaborate?",
                  "Need a developer?",
                  "Let's build something amazing!",
                  "Ready to bring your ideas to life?"
                ]}
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300"
                duration={3000}
                transitionDuration={0.5}
                delay={2000}
              />
            </span>
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="inline-block min-w-[160px] sm:min-w-[180px] md:min-w-[200px]">
                  <MorphingText 
                    texts={[
                      "Contact Information",
                      "Get In Touch",
                      "Let's Connect",
                      "Reach Out",
                      "Start a Conversation"
                    ]}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                    duration={4000}
                    transitionDuration={0.6}
                    delay={3000}
                  />
                </span>
              </h3>
              
              <div className="space-y-4">
                <motion.a
                  href="mailto:moinkhan.jsx@gmail.com"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  aria-label="Send me an email"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-xl flex items-center justify-center group-hover:bg-amber-600 transition-colors flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-.964 1.86l-7.5 5.25a2.25 2.25 0 0 1-2.572 0l-7.5-5.25a2.25 2.25 0 0 1-.964-1.86V6.75" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Email</div>
                    <div className="text-amber-600 dark:text-amber-400 text-sm sm:text-base truncate">moinkhan.jsx@gmail.com</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/moinkhanjsx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  aria-label="Visit my GitHub profile (opens in new tab)"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-xl flex items-center justify-center group-hover:bg-amber-600 transition-colors flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">GitHub</div>
                    <div className="text-amber-600 dark:text-amber-400 text-sm sm:text-base truncate">github.com/moinkhanjsx</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/your-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  aria-label="Visit my LinkedIn profile (opens in new tab)"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-xl flex items-center justify-center group-hover:bg-amber-600 transition-colors flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">LinkedIn</div>
                    <div className="text-amber-600 dark:text-amber-400 text-sm sm:text-base truncate">linkedin.com/in/your-linkedin</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="inline-block min-w-[160px] sm:min-w-[180px] md:min-w-[200px]">
                  <MorphingText 
                    texts={[
                      "Send a Message",
                      "Let's Talk",
                      "Start a Project",
                      "Get a Quote",
                      "Discuss Ideas"
                    ]}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                    duration={3500}
                    transitionDuration={0.5}
                    delay={4000}
                  />
                </span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors text-sm sm:text-base"
                    placeholder="Your name"
                    required
                    aria-required="true"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors text-sm sm:text-base"
                    placeholder="your.email@example.com"
                    required
                    aria-required="true"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span className="inline-block min-w-[120px] sm:min-w-[140px] md:min-w-[160px]">
                      <MorphingText 
                        texts={[
                          "Message",
                          "Project Details",
                          "Tell me about your idea",
                          "What can I help with?",
                          "Your requirements"
                        ]}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        duration={4000}
                        transitionDuration={0.6}
                        delay={5000}
                      />
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors resize-none text-sm sm:text-base"
                    placeholder="Tell me about your project or idea..."
                    required
                    aria-required="true"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-amber-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  aria-label="Send message"
                >
                  <MorphingText 
                    texts={[
                      "Send Message",
                      "Get Started",
                      "Let's Build",
                      "Start Project",
                      "Send Request"
                    ]}
                    className="text-white font-semibold"
                    duration={3000}
                    transitionDuration={0.4}
                    delay={6000}
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
