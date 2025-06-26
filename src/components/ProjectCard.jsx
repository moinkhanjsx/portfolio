import { useInView } from 'react-intersection-observer'

const ProjectCard = ({ project, index, isDarkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const theme = {
    card: isDarkMode ? 'bg-black/30' : 'bg-white/90',
    border: isDarkMode ? 'border-white/20' : 'border-gray-300',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-800',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-700',
  }

  return (
    <div 
      ref={ref}
      className={`group relative ${theme.card} backdrop-blur-xl rounded-3xl border ${theme.border} hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden`}
      data-aos="fade-up"
      data-aos-delay={index * 200}
    >
      
      {/* Project Preview/Screenshot Section */}
      <div className={`relative h-64 overflow-hidden rounded-t-3xl ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
        {project.live && inView ? (
          // Live Website Preview (only load when in view)
          <div className="w-full h-full relative">
            <iframe 
              src={project.live}
              className="w-full h-full transform scale-75 origin-top-left"
              style={{
                width: '133.33%',
                height: '133.33%',
                pointerEvents: 'none'
              }}
              title={`${project.title} Preview`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              🟢 Live
            </div>
          </div>
        ) : (
          // Fallback gradient background
          <div className={`${project.image} h-full relative flex items-center justify-center`}>
            <div className="text-6xl opacity-30">💻</div>
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        )}
        
        {/* Overlay with project type */}
        <div className={`absolute bottom-4 left-4 ${isDarkMode ? 'bg-black/70' : 'bg-white/70'} backdrop-blur-sm ${theme.text} text-sm px-3 py-1 rounded-full`}>
          {project.title.includes('Website') ? '○ Website' : 
           project.title.includes('Portfolio') ? '◊ Portfolio' : 
           '◊ Web App'}
        </div>
      </div>

      {/* Project Information */}
      <div className="p-8">
        <div className="mb-6">
          <h3 className={`text-2xl font-bold ${theme.text} mb-3 group-hover:text-purple-300 transition-colors duration-300`}>
            {project.title}
          </h3>
          <p className={`${theme.textMuted} leading-relaxed text-sm`}>
            {project.description}
          </p>
        </div>
        
        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className={`text-sm font-semibold ${theme.textSecondary} mb-3`}>Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <span 
                key={techIndex} 
                className={`px-3 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full text-xs ${theme.text} font-medium border ${theme.border} hover:border-purple-400/50 transition-colors duration-300`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          {project.live && (
            <button 
              onClick={() => window.open(project.live, '_blank')}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2"
            >
              <span className="text-lg">→</span>
              View Live Project
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          )}
          <button 
            onClick={() => window.open(project.github || 'https://github.com/kmoin6231/', '_blank')}
            className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-gray-500/25 flex items-center justify-center gap-2 border border-gray-600/50 hover:border-gray-500"
          >
            <span className="text-lg">○</span>
            View Source Code
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>

      {/* Floating particles for each project card */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '0.5s'}}></div>
    </div>
  )
}

export default ProjectCard
