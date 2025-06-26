import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

// Simple typing component
const SimpleTyping = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed])

  return <span>{displayText}<span className="animate-pulse">|</span></span>
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true) // Start with dark mode
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    })
  }, [])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  // Skills data
  const skills = [
    { name: 'React', level: 95, icon: '⚛️', color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', level: 92, icon: '📝', color: 'from-yellow-400 to-orange-500' },
    { name: 'TypeScript', level: 88, icon: '🔷', color: 'from-blue-500 to-indigo-600' },
    { name: 'Node.js', level: 85, icon: '🟢', color: 'from-green-400 to-green-600' },
    { name: 'Python', level: 80, icon: '🐍', color: 'from-blue-400 to-yellow-500' },
    { name: 'CSS/SCSS', level: 90, icon: '🎨', color: 'from-pink-400 to-purple-600' }
  ]

  // Projects data
  const projects = [
    {
      title: 'AI-Powered Portfolio',
      description: 'Advanced React portfolio with AI features, dynamic themes, and stunning animations.',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Tailwind CSS', 'AOS', 'Vite'],
      liveUrl: 'https://portfolio-demo.com',
      githubUrl: 'https://github.com/moinkhan-in/portfolio',
      featured: true
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React frontend, Node.js backend, and secure payments.',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/moinkhan-in/ecommerce',
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'Productivity application with drag-and-drop functionality and real-time collaboration.',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
      liveUrl: 'https://taskflow-pro.netlify.app/',
      githubUrl: 'https://github.com/moinkhan-in/task-manager',
      featured: true
    }
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} overflow-x-hidden transition-all duration-500`}>
      {/* Mouse follower */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-purple-900/20 to-blue-900/20' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}></div>
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-300"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
        ></div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 ${isDarkMode ? 'bg-white/10' : 'bg-purple-400/20'} rounded-full animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-lg border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Moin Khan
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-3 py-2 transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-200'} border transition-all duration-300 hover:scale-110 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                {isDarkMode ? (
                  <span className="text-yellow-400 text-xl">☀️</span>
                ) : (
                  <span className="text-purple-600 text-xl">🌙</span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-200'} border transition-all duration-300`}
              >
                {isDarkMode ? (
                  <span className="text-yellow-400 text-sm">☀️</span>
                ) : (
                  <span className="text-purple-600 text-sm">🌙</span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-200'} border transition-all duration-300`}
              >
                <div className="space-y-1">
                  <div className={`w-5 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} transition-all duration-300`}></div>
                  <div className={`w-5 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} transition-all duration-300`}></div>
                  <div className={`w-5 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} transition-all duration-300`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-16 left-0 w-full ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="px-4 sm:px-6 py-4 space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-3 py-2 transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 overflow-hidden z-10">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className={`text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black mb-8 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent leading-none`}>
              <SimpleTyping text="MOIN KHAN" speed={120} />
            </h1>
            
            <h2 className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-10 ${isDarkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
              Full-Stack Developer
            </h2>
            
            <div className={`text-lg sm:text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-16 max-w-4xl mx-auto`}>
              Crafting extraordinary digital experiences with cutting-edge technology and innovative solutions.
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mb-16">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              View My Work
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-4 border-2 ${isDarkMode ? 'border-purple-400 text-purple-400 hover:bg-purple-400' : 'border-purple-500 text-purple-500 hover:bg-purple-500'} rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 hover:text-white`}
            >
              Get In Touch
            </button>
          </div>
          
          {/* Simple Terminal Display */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-300'} border rounded-lg p-4 font-mono text-sm`}>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              </div>
              <div className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                $ <SimpleTyping text="npm start --portfolio" speed={80} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 relative z-10" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent`}>
            About Me
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-25"></div>
                <div className={`relative p-8 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-sm rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    My Journey
                  </h3>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    I'm a passionate full-stack developer with over 5 years of experience creating innovative web applications. 
                    My expertise spans from modern frontend frameworks to robust backend architectures, with a special focus 
                    on AI integration and user experience optimization.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className={`p-6 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-lg rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h4 className="text-xl font-bold mb-3 text-purple-400">Frontend Expertise</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  React, Vue.js, TypeScript, Tailwind CSS, Three.js, GSAP
                </p>
              </div>
              
              <div className={`p-6 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-lg rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h4 className="text-xl font-bold mb-3 text-cyan-400">Backend Mastery</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Node.js, Python, Express, FastAPI, MongoDB, PostgreSQL
                </p>
              </div>
              
              <div className={`p-6 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-lg rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h4 className="text-xl font-bold mb-3 text-pink-400">AI & Innovation</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  TensorFlow, OpenAI GPT, Computer Vision, NLP, Machine Learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 sm:px-6 relative z-10" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent`}>
            Skills & Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-xl p-6 border hover:scale-105 transition-all duration-300`} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{skill.icon}</span>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h3>
                </div>
                <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3 mb-2`}>
                  <div 
                    className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 relative z-10" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent`}>
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-xl overflow-hidden border hover:scale-105 transition-all duration-300`} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className={`h-48 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                  <span className="text-6xl">🚀</span>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{project.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`px-3 py-1 ${isDarkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'} rounded-full text-sm`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <button 
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300"
                      >
                        Live Demo
                      </button>
                    )}
                    <button 
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className={`flex-1 py-2 px-4 border-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} rounded-lg font-medium transition-all duration-300`}
                    >
                      GitHub
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 relative z-10" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl sm:text-6xl font-bold mb-8 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent`}>
            Let's Create Something Amazing
          </h2>
          
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-12 max-w-2xl mx-auto`}>
            Ready to bring your ideas to life? Let's discuss your next project and create something extraordinary together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-3xl p-8 border hover:scale-105 transition-all duration-300`} data-aos="fade-up" data-aos-delay="100">
              <div className="text-5xl mb-6">📧</div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Email</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Drop me a line anytime</p>
              <button 
                onClick={() => window.open('mailto:kmoin6231@gmail.com', '_blank')}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                kmoin6231@gmail.com
              </button>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-3xl p-8 border hover:scale-105 transition-all duration-300`} data-aos="fade-up" data-aos-delay="200">
              <div className="text-5xl mb-6">📱</div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Phone</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Let's have a quick chat</p>
              <button 
                onClick={() => window.open('tel:+923024060098', '_blank')}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                +92 302 4060098
              </button>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-3xl p-8 border hover:scale-105 transition-all duration-300`} data-aos="fade-up" data-aos-delay="300">
              <div className="text-5xl mb-6">💼</div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>LinkedIn</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Connect professionally</p>
              <button 
                onClick={() => window.open('https://linkedin.com/in/kmoin6231', '_blank')}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                Connect on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 sm:px-6 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} relative z-10 transition-all duration-500`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Moin Khan - Crafted with ❤️ and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
