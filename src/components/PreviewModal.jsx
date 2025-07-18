import React from "react";

const PreviewModal = ({ open, onClose, project }) => {
  if (!open || !project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-sm sm:max-w-lg w-full p-4 sm:p-6 relative animate-fade-in">
        <button
          className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-amber-600 text-xl sm:text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-32 sm:h-48 object-cover rounded-xl mb-4 border border-gray-200 dark:border-gray-700"
        />
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-amber-600 dark:text-amber-400">{project.title}</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-200 text-sm sm:text-base">{project.description}</p>
        {project.tech && (
          <div className="mb-4">
            <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">Tech Stack: </span>
            <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{project.tech}</span>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold shadow text-sm sm:text-base text-center"
            >
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold shadow text-sm sm:text-base text-center"
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
