


import React, { useRef, useEffect, useState } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiC, SiCplusplus } from 'react-icons/si';

const skills = [
  { name: "HTML5", level: 90, icon: <FaHtml5 className="text-orange-600" />, desc: "Semantic, accessible markup" },
  { name: "CSS3", level: 85, icon: <FaCss3Alt className="text-blue-500" />, desc: "Modern layouts, Flexbox, Grid" },
  { name: "JavaScript", level: 88, icon: <FaJs className="text-yellow-400" />, desc: "ES6+, async, DOM, APIs" },
  { name: "TypeScript", level: 80, icon: <SiTypescript className="text-blue-700" />, desc: "Typed JavaScript, safer code" },
  { name: "React", level: 80, icon: <FaReact className="text-cyan-400" />, desc: "Hooks, SPA, state management" },
  { name: "Tailwind CSS", level: 75, icon: <SiTailwindcss className="text-cyan-500" />, desc: "Utility-first, responsive" },
  { name: "Node.js", level: 70, icon: <FaNodeJs className="text-green-600" />, desc: "APIs, Express, backend" },
  { name: "Express.js", level: 70, icon: <SiExpress className="text-gray-700 dark:text-gray-200" />, desc: "Minimal, fast Node.js web framework" },
  { name: "MongoDB", level: 65, icon: <SiMongodb className="text-green-700" />, desc: "NoSQL database, flexible schema" },
  { name: "C", level: 60, icon: <SiC className="text-blue-800" />, desc: "Procedural, low-level programming" },
  { name: "C++", level: 60, icon: <SiCplusplus className="text-blue-500" />, desc: "OOP, STL, system programming" },
  { name: "Java", level: 65, icon: <FaJava className="text-red-700" />, desc: "OOP, cross-platform, backend" },
];

function useInView(ref) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isInView;
}

const Skills = () => {
  const sectionRef = useRef();
  const inView = useInView(sectionRef);

  const [hovered, setHovered] = useState(null);
  const categories = [
    {
      name: 'Frontend',
      skills: skills.filter(s => ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS"].includes(s.name)),
    },
    {
      name: 'Backend',
      skills: skills.filter(s => ["Node.js", "Express.js", "MongoDB"].includes(s.name)),
    },
    {
      name: 'Languages',
      skills: skills.filter(s => ["C", "C++", "Java"].includes(s.name)),
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-12 sm:py-16 px-2 sm:px-4 w-full bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow mb-8"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center animate-fade-in">Skills</h2>
      {/* Tabs for categories */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`px-5 py-2 rounded-full font-semibold border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-base sm:text-lg
              ${selectedCategory === cat.name ? 'bg-amber-500 text-white border-amber-500 shadow' : 'bg-white dark:bg-gray-800 text-amber-700 border-amber-300 dark:border-gray-700 hover:bg-amber-100 dark:hover:bg-gray-700'}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {/* Skills grid for selected category */}
      <div className="flex flex-col gap-12">
        {categories.filter(cat => cat.name === selectedCategory).map((cat) => (
          <div key={cat.name} className="animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {cat.skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className={`flex flex-col items-center group relative transition-transform duration-300 ease-out transform bg-white/90 dark:bg-gray-800/80 rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl cursor-pointer border border-amber-100 dark:border-gray-700`}
                  onMouseEnter={() => setHovered(skill.name)}
                  onMouseLeave={() => setHovered(null)}
                  tabIndex={0}
                >
                  <span className="text-4xl mb-2 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                  <span className="font-semibold mb-2 text-lg flex items-center gap-2">
                    {skill.name}
                    {/* Badge for proficiency */}
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-300">
                      {skill.level >= 85 ? 'Expert' : skill.level >= 70 ? 'Advanced' : 'Intermediate'}
                    </span>
                  </span>
                  {/* Animated Circular progress bar */}
                  <div className="relative flex items-center justify-center my-2" style={{ width: 64, height: 64 }}>
                    <svg width="64" height="64">
                      <circle
                        cx="32" cy="32" r="28"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      <circle
                        cx="32" cy="32" r="28"
                        fill="none"
                        stroke="#f59e42"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={inView ? (2 * Math.PI * 28 * (1 - skill.level / 100)) : 2 * Math.PI * 28}
                        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,2,.6,1)', filter: 'drop-shadow(0 2px 6px #fbbf24aa)' }}
                      />
                    </svg>
                    <span className="absolute text-base font-bold text-amber-600 dark:text-amber-400">{skill.level}%</span>
                  </div>
                  {/* Tooltip */}
                  <span
                    className={`pointer-events-none absolute z-20 left-1/2 -translate-x-1/2 top-2 -mt-8 px-3 py-1 rounded bg-amber-600 text-white text-xs font-medium opacity-0 group-hover:opacity-100 group-hover:translate-y-[-8px] transition-all duration-300 shadow-lg whitespace-nowrap`}
                    style={{
                      opacity: hovered === skill.name ? 1 : 0,
                      transform: hovered === skill.name ? 'translate(-50%, -8px)' : 'translate(-50%, 0)',
                    }}
                  >
                    {skill.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
