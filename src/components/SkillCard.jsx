import { useInView } from 'react-intersection-observer'

const SkillCard = ({ skill, index, isDarkMode }) => {
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
    <div ref={ref} className="group relative" data-aos="fade-up" data-aos-delay={index * 100}>
      <div className={`${theme.card} backdrop-blur-xl rounded-2xl p-8 border ${theme.border} hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 glassmorphism`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-2xl font-bold ${theme.text} group-hover:text-purple-300 transition-colors duration-300`}>{skill.name}</h3>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-125 transition-transform duration-300 border-2 ${theme.border} group-hover:border-purple-400/50`}>
            {skill.name === 'React' && (
              <div className="text-blue-400 font-bold text-lg bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                React
              </div>
            )}
            {skill.name === 'JavaScript' && (
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-black font-bold text-sm">
                JS
              </div>
            )}
            {skill.name === 'TypeScript' && (
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
                TS
              </div>
            )}
            {skill.name === 'Node.js' && (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                Node
              </div>
            )}
            {skill.name === 'Python' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-yellow-400 rounded flex items-center justify-center text-white font-bold text-sm">
                Py
              </div>
            )}
            {skill.name === 'Tailwind CSS' && (
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                TW
              </div>
            )}
          </div>
        </div>
        
        <div className={`relative h-4 ${isDarkMode ? 'bg-gray-800/80' : 'bg-gray-200'} rounded-full overflow-hidden mb-4 shadow-inner`}>
          <div 
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out shadow-lg ${inView ? 'animate-slideIn' : 'w-0'}`}
            style={{ 
              width: inView ? `${skill.level}%` : '0%',
              transitionDelay: `${index * 200}ms`
            }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm ${theme.textMuted} font-medium`}>Proficiency</span>
          <span className={`text-lg font-bold ${theme.text} group-hover:text-cyan-300 transition-colors duration-300`}>{skill.level}%</span>
        </div>
        
        {/* Skill level indicator */}
        <div className="mt-4 text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            skill.level >= 90 ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
            skill.level >= 80 ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
            'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
          }`}>
            {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
          </span>
        </div>
      </div>
      
      {/* Floating particles for each skill card */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '0.5s'}}></div>
    </div>
  )
}

export default SkillCard
