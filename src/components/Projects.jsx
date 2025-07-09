import React, { useState } from "react";
import { motion } from "framer-motion";
import HoverPreview from "./HoverPreview";
import PreviewModal from "./PreviewModal";

const projects = [
  {
    image: "/bcd.png", // HomeShare screenshot
    title: "HomeShare Listings",
    description: "A full-featured property rental and listing platform.",
    link: "https://homeshare-9joh.onrender.com/listings",
    tech: "React, Node.js, Express, MongoDB, Tailwind CSS"
  },
  {
    image: "/abc.png", // Blog screenshot
    title: "Mega Blog Portfolio",
    description: "A modern React + Vite + Tailwind portfolio and blog web app.",
    link: "https://mega-blog-3ffs.onrender.com",
    github: "", // Add your GitHub repo link if you want
    tech: "React, Vite, Tailwind CSS, Node.js, Express, MongoDB"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleOpen = (project) => {
    setSelected(project);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setSelected(null);
  };

  return (
    <section id="projects" className="py-12 sm:py-16 px-0 sm:px-2 w-full max-w-full overflow-x-hidden" aria-labelledby="projects-heading">
      <motion.h2 
        id="projects-heading"
        className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-2 sm:px-0 w-full max-w-4xl mx-auto overflow-x-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        role="list"
        aria-label="Project portfolio"
      >
        {projects.map((project, idx) => (
          <motion.div 
            key={idx} 
            onClick={() => handleOpen(project)} 
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded-lg"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpen(project);
              }
            }}
            aria-label={`View details for ${project.title} project`}
          >
            <HoverPreview {...project} />
          </motion.div>
        ))}
      </motion.div>
      <PreviewModal open={modalOpen} onClose={handleClose} project={selected} />
    </section>
  );
};

export default Projects;
