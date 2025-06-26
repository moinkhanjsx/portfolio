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
  const [previewModal, setPreviewModal] = useState({ isOpen: false, project: null })

  // Initialize AOS animations with safer settings
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: 'mobile', // Disable on mobile to prevent conflicts
      mirror: false,
      anchorPlacement: 'top-bottom'
    })
    
    // Refresh AOS after initialization
    setTimeout(() => {
      AOS.refresh()
    }, 100)
  }, [])

  // Ensure smooth scrolling is working
  useEffect(() => {
    // Force smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Add debugging for scroll issues
    const debugScrollIssues = () => {
      const bodyOverflow = window.getComputedStyle(document.body).overflow
      const htmlOverflow = window.getComputedStyle(document.documentElement).overflow
      
      if (bodyOverflow === 'hidden' || htmlOverflow === 'hidden') {
        console.warn('Scroll may be blocked:', { bodyOverflow, htmlOverflow })
      }
    }
    
    // Check for scroll blocks periodically
    const intervalId = setInterval(debugScrollIssues, 2000)
    
    return () => {
      clearInterval(intervalId)
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  // Mouse tracking for interactive effects - simplified
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
      // Get the header height for proper offset
      const header = document.querySelector('nav')
      const headerHeight = header ? header.offsetHeight : 80
      const offsetTop = element.offsetTop - headerHeight - 20
      
      // Ensure we're not in a modal state that might interfere
      if (document.body.style.overflow !== 'hidden') {
        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: 'smooth'
        })
      }
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
      title: 'Cool Air Repairs',
      description: 'Professional air conditioning services website with modern design, service booking, and customer contact features.',
      tags: ['React', 'Responsive Design', 'Business Website', 'Contact Forms'],
      liveUrl: 'https://sayyedshoaib.onrender.com',
      githubUrl: 'https://github.com/moinkhan-in/cool-air-repairs',
      featured: true,
      previewable: true
    },
    {
      title: 'AI-Powered Portfolio',
      description: 'Advanced React portfolio with AI features, dynamic themes, and stunning animations.',
      tags: ['React', 'Tailwind CSS', 'AOS', 'Vite'],
      liveUrl: 'https://portfolio-demo.com',
      githubUrl: 'https://github.com/moinkhan-in/portfolio',
      featured: true,
      previewable: false // This would be this current site
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React frontend, Node.js backend, and secure payments.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/moinkhan-in/ecommerce',
      featured: true,
      previewable: false // No live URL provided
    },
    {
      title: 'Task Management App',
      description: 'Productivity application with drag-and-drop functionality and real-time collaboration.',
      tags: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
      liveUrl: 'https://taskflow-pro.netlify.app/',
      githubUrl: 'https://github.com/moinkhan-in/task-manager',
      featured: true,
      previewable: true
    }
  ]

  // Preview Modal Component
  const PreviewModal = ({ isOpen, project, onClose, isDarkMode }) => {
    const [isLoading, setIsLoading] = useState(true)

    // Handle escape key and body scroll
    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape' && isOpen) {
          onClose()
        }
      }

      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
        // Add modal-open class instead of directly setting styles
        document.body.classList.add('modal-open')
        
        return () => {
          document.removeEventListener('keydown', handleEscape)
          document.body.classList.remove('modal-open')
        }
      } else {
        // Ensure modal-open class is removed
        document.body.classList.remove('modal-open')
      }

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.classList.remove('modal-open')
      }
    }, [isOpen, onClose])

    // Reset loading state when modal opens
    useEffect(() => {
      if (isOpen) {
        setIsLoading(true)
      }
    }, [isOpen])

    if (!isOpen || !project) return null

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className={`relative w-full max-w-7xl h-[90vh] ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden shadow-2xl`}>
          {/* Modal Header */}
          <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {project.title} - Live Preview
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {project.liveUrl}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* External Link Button */}
              <button
                onClick={() => window.open(project.liveUrl, '_blank')}
                className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} rounded-lg transition-all duration-200 flex items-center space-x-2`}
                title="Open in new tab"
              >
                <span>↗</span>
                <span className="hidden sm:inline">Open</span>
              </button>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className={`px-4 py-2 ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white rounded-lg transition-all duration-200`}
              >
                ✕
              </button>
            </div>
          </div>
          
          {/* Iframe Container */}
          <div className="relative h-[calc(100%-80px)]">
            {/* Loading Overlay */}
            {isLoading && (
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center z-10`}>
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading preview...</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Press Escape to close</p>
                </div>
              </div>
            )}
            
            <iframe
              src={project.liveUrl}
              title={`${project.title} Preview`}
              className="w-full h-full border-0"
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>
      {/* Mouse follower */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-purple-900/20 to-blue-900/20' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}></div>
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
        ></div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
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
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
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
      <section id="about" className="py-24 px-4 sm:px-6 relative" data-aos="fade-up">
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
      <section id="skills" className="py-24 px-4 sm:px-6 relative" data-aos="fade-up">
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
      <section id="projects" className="py-24 px-4 sm:px-6 relative" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent`}>
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-xl overflow-hidden border hover:scale-105 transition-all duration-300`} data-aos="fade-up" data-aos-delay={index * 100}>
                <div 
                  className={`h-48 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} relative overflow-hidden group cursor-pointer`}
                  onClick={() => {
                    if (project.previewable && project.liveUrl) {
                      setPreviewModal({ isOpen: true, project })
                    } else if (project.liveUrl) {
                      window.open(project.liveUrl, '_blank')
                    } else if (project.githubUrl) {
                      window.open(project.githubUrl, '_blank')
                    }
                  }}
                >
                  {project.liveUrl ? (
                    <div className="relative w-full h-full">
                      {/* Website thumbnail preview */}
                      <iframe
                        src={project.liveUrl}
                        title={`${project.title} preview`}
                        className="w-full h-full border-0"
                        style={{ 
                          transform: 'scale(0.25)',
                          transformOrigin: 'top left',
                          width: '400%', 
                          height: '400%',
                          pointerEvents: 'none',
                          contain: 'layout style'
                        }}
                        loading="lazy"
                        sandbox="allow-same-origin"
                      />
                      
                      {/* Hover overlay with preview icon */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm font-medium">
                          {project.previewable ? 'Click to Preview' : 'Click to Open'}
                        </div>
                      </div>
                      
                      {/* Live indicator */}
                      <div className="absolute top-3 right-3">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span>LIVE</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-4xl mb-2 block">�</span>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Code Repository</span>
                      </div>
                    </div>
                  )}
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
                  <div className="flex gap-2">
                    {project.previewable && project.liveUrl && (
                      <button 
                        onClick={() => setPreviewModal({ isOpen: true, project })}
                        className="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 text-sm"
                        title="Preview in modal"
                      >
                        Preview
                      </button>
                    )}
                    {project.liveUrl && (
                      <button 
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className={`${project.previewable ? 'flex-1' : 'flex-1'} py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 text-sm`}
                      >
                        Live Demo
                      </button>
                    )}
                    <button 
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className={`${project.liveUrl ? 'flex-1' : 'flex-1'} py-2 px-4 border-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} rounded-lg font-medium transition-all duration-300 text-sm`}
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
      <section id="contact" className="py-24 px-4 sm:px-6 relative" data-aos="fade-up">
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
      <footer className={`py-8 px-4 sm:px-6 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} relative transition-all duration-500`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Moin Khan - Crafted with ❤️ and lots of ☕
          </p>
        </div>
      </footer>

      {/* Preview Modal */}
      <PreviewModal 
        isOpen={previewModal.isOpen}
        project={previewModal.project}
        onClose={() => setPreviewModal({ isOpen: false, project: null })}
        isDarkMode={isDarkMode}
      />
    </div>
  )
}

export default App
