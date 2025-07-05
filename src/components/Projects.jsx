import React, { useState } from "react";
import HoverPreview from "./HoverPreview";
import PreviewModal from "./PreviewModal";

const projects = [
  {
    image: "/vite.svg",
    title: "Vite Project",
    description: "A blazing fast Vite-powered app.",
    link: "https://vitejs.dev/"
  },
  {
    image: "/abc.png", // Blog screenshot
    title: "Mega Blog Portfolio",
    description: "A modern React + Vite + Tailwind portfolio and blog web app.",
    link: "https://mega-blog-3ffs.onrender.com",
    github: "", // Add your GitHub repo link if you want
    tech: "React, Vite, Tailwind CSS, Node.js, Express, MongoDB"
  },
  {
    image: "/bcd.png", // HomeShare screenshot
    title: "HomeShare Listings",
    description: "A full-featured property rental and listing platform.",
    link: "https://homeshare-9joh.onrender.com/listings",
    tech: "React, Node.js, Express, MongoDB, Tailwind CSS"
  }
];


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
    <section id="projects" className="py-12 sm:py-16 px-0 sm:px-2 w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0">
        {projects.map((project, idx) => (
          <div key={idx} onClick={() => handleOpen(project)} className="cursor-pointer">
            <HoverPreview {...project} />
          </div>
        ))}
      </div>
      <PreviewModal open={modalOpen} onClose={handleClose} project={selected} />
    </section>
  );
};

export default Projects;
