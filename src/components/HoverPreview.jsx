import React from "react";



const HoverPreview = ({ image, title, description }) => (
  <div className="group relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:border-amber-500 hover:scale-[1.025]">
    <div className="relative h-56 bg-gradient-to-br from-amber-100 via-white to-amber-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
      <img
        src={image}
        alt={title}
        className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500 rounded-t-3xl"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="bg-white/70 dark:bg-gray-900/70 rounded-xl px-6 py-4 shadow-lg backdrop-blur-md border border-amber-400">
          <span className="text-gray-900 dark:text-white text-base font-semibold text-center drop-shadow-lg">{description}</span>
        </div>
        <span className="mt-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-white shadow-lg border-4 border-white dark:border-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </div>
    <div className="p-6 flex flex-col items-center">
      <h3 className="text-2xl font-extrabold mb-2 text-center group-hover:text-amber-600 transition-colors duration-300 drop-shadow-lg">{title}</h3>
    </div>
    <div className="absolute inset-0 pointer-events-none rounded-3xl group-hover:ring-4 group-hover:ring-amber-300/40 transition-all duration-300" />
  </div>
);

export default HoverPreview;
