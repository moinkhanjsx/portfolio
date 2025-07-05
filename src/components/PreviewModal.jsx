import React from "react";

const PreviewModal = ({ open, onClose, project }) => {
  if (!open || !project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-amber-600 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-xl mb-4 border border-gray-200 dark:border-gray-700"
        />
        <h3 className="text-2xl font-bold mb-2 text-amber-600 dark:text-amber-400">{project.title}</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-200">{project.description}</p>
        {project.tech && (
          <div className="mb-4">
            <span className="font-semibold text-gray-800 dark:text-gray-100">Tech Stack: </span>
            <span className="text-gray-600 dark:text-gray-300">{project.tech}</span>
          </div>
        )}
        <div className="flex gap-4 mt-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold shadow"
            >
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold shadow"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
