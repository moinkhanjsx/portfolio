import { useState, useEffect, lazy, Suspense } from 'react'
import { useInView } from 'react-intersection-observer'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'
import TypingAnimation from './components/TypingAnimation'
import { WordByWordTyping } from './components/AnimatedText'
import { GlitchTyping } from './components/AdvancedTyping'
import { TerminalTyping } from './components/CodeTyping'
// import MatrixRain from './components/MatrixRain'
// import { GlitchTypewriter, CodeTypingEffect } from './components/AdvancedTypingEffects'
import { StatsSection } from './components/AnimatedCounter'
// import EnhancedContactForm from './components/EnhancedContactForm'

// Lazy loaded components for performance
const LazySkillCard = lazy(() => import('./components/SkillCard'))
const LazyProjectCard = lazy(() => import('./components/ProjectCard'))

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(false) // Disabled for debug

  // Initialize AOS and theme
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    })

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Reduced loading time

    return () => clearTimeout(timer)
  }, [])

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 64 // height of the navigation bar
      const elementPosition = element.offsetTop - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  const skills = [
    { name: 'React', level: 95, color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', level: 90, color: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', level: 85, color: 'from-blue-500 to-blue-700' },
    { name: 'Node.js', level: 80, color: 'from-green-400 to-green-600' },
    { name: 'Python', level: 75, color: 'from-green-500 to-green-700' },
    { name: 'Tailwind CSS', level: 90, color: 'from-cyan-400 to-cyan-600' }
  ]

  const projects = [
    {
      title: 'Cooling Systems Service Website',
      description: 'Professional service website for Sayyed Shoaib - specializing in all cooling systems repair and maintenance. Features modern design, service listings, and contact functionality.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      image: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500',
      github: 'https://github.com/kmoin6231/',
      live: 'https://sayyedshoaib.onrender.com/'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with React and Tailwind CSS featuring stunning animations and glassmorphism design.',
      tech: ['React', 'Tailwind CSS', 'Vite', 'JavaScript'],
      image: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
      github: 'https://github.com/kmoin6231/portfolio'
    },
    {
      title: 'Full-Stack Web Applications',
      description: 'Collection of complete web applications with user authentication, database integration, and modern UI/UX design patterns.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-500',
      github: 'https://github.com/kmoin6231/'
    }
  ]

  // Theme variables with improved contrast
  const theme = {
    bg: isDarkMode ? 'bg-black' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-800',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-700',
    card: isDarkMode ? 'bg-black/30' : 'bg-white/90',
    border: isDarkMode ? 'border-white/20' : 'border-gray-300',
    nav: isDarkMode ? 'bg-black/20' : 'bg-white/90',
  }

  // Loading screen - Temporarily disabled for debug
  if (false && isLoading) {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
          <h2 className={`text-2xl sm:text-3xl font-bold ${theme.text} mb-4`}>Loading Universe's Best Portfolio</h2>
          <div className="w-48 sm:w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} overflow-x-hidden transition-all duration-500 relative`}>
      {/* Matrix Rain Background - Completely Disabled for Debug */}
      {/* <MatrixRain intensity={0.2} speed={100} opacity={isDarkMode ? 0.03 : 0.01} /> */}
      
      {/* Animated Background */}
      <div className="fixed inset-0" style={{ zIndex: -5 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            transition: 'all 0.3s ease'
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-bounce"></div>
      </div>

      {/* Navigation - Responsive */}
      <nav className={`fixed top-0 w-full backdrop-blur-lg border-b ${theme.border} transition-all duration-500`} style={{ zIndex: 50, background: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}>
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
                  className={`relative px-3 py-2 transition-all duration-300 ${
                    activeSection === item.toLowerCase() 
                      ? 'text-cyan-400' 
                      : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400"></div>
                  )}
                </button>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${theme.card} ${theme.border} border transition-all duration-300 hover:scale-110`}
                data-aos="fade-left"
                data-aos-delay="200"
              >
                {isDarkMode ? (
                  <span className="text-yellow-400 text-xl">☀️</span>
                ) : (
                  <span className="text-purple-400 text-xl">🌙</span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${theme.card} ${theme.border} border transition-all duration-300`}
              >
                {isDarkMode ? (
                  <span className="text-yellow-400 text-sm">☀️</span>
                ) : (
                  <span className="text-purple-400 text-sm">🌙</span>
                )}
              </button>
              
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className={`w-full h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
                  <div className={`w-full h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`w-full h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-16 left-0 w-full ${isDarkMode ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-lg border-b ${theme.border} transition-all duration-300`}>
            <div className="px-4 sm:px-6 py-4 space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-3 py-2 transition-all duration-300 ${
                    activeSection === item.toLowerCase() 
                      ? 'text-cyan-400' 
                      : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Fully Responsive */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 overflow-hidden" style={{ zIndex: 10 }}>
        <div className="text-center max-w-6xl mx-auto relative">
          <div className="mb-8 sm:mb-16">
            <div className="relative mb-8 sm:mb-12" data-aos="fade-up" data-aos-duration="1200">
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black mb-4 sm:mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent leading-none tracking-tighter">
                UNIVERSE'S BEST
              </h1>
              <div className="absolute inset-0 text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black mb-4 sm:mb-8 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-cyan-400/20 bg-clip-text text-transparent blur-3xl animate-pulse leading-none tracking-tighter">
                UNIVERSE'S BEST
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 sm:-translate-y-4 w-16 sm:w-32 h-1 sm:h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse"></div>
            </div>
            
            <h2 className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-10 ${theme.text} leading-tight`} data-aos="fade-up" data-aos-delay="200">
              <TypingAnimation 
                texts={[
                  'Full-Stack Developer',
                  'React Specialist', 
                  'UI/UX Designer',
                  'Problem Solver',
                  'Code Architect'
                ]}
                speed={120}
                deleteSpeed={80}
                pauseTime={2500}
                className={`bg-gradient-to-r ${isDarkMode ? 'from-white via-gray-100 to-white' : 'from-gray-900 via-gray-700 to-gray-900'} bg-clip-text text-transparent`}
              />
            </h2>
            
            <div className="relative" data-aos="fade-up" data-aos-delay="600">
              <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl ${theme.textSecondary} mb-8 sm:mb-16 max-w-4xl mx-auto leading-relaxed font-light px-4 sm:px-0`}>
                <WordByWordTyping 
                  text="Crafting extraordinary digital experiences with cutting-edge technology and innovative solutions that push the boundaries"
                  speed={150}
                  startDelay={1000}
                  className="inline"
                />
                <br className="block sm:hidden" />
                <span className="mt-2 sm:mt-0 block sm:inline">
                  <span className="text-purple-400 font-semibold"> • Innovative</span>
                  <span className="text-cyan-400 font-semibold"> • Modern</span>
                  <span className="text-pink-400 font-semibold"> • Professional</span>
                </span>
              </div>
              <div className="absolute -top-2 sm:-top-4 left-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-purple-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 sm:-bottom-4 right-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-4 sm:left-10 w-1 sm:w-2 h-1 sm:h-2 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-8 sm:mb-16 px-4 sm:px-0" data-aos="zoom-in" data-aos-delay="600">
            <button 
              onClick={() => scrollToSection('projects')}
              className={`group relative w-full sm:w-auto px-8 sm:px-14 py-4 sm:py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full ${isDarkMode ? 'text-white' : 'text-white'} font-bold text-lg sm:text-xl overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 hover:rotate-2 transform`}
              data-aos="slide-right"
              data-aos-delay="800"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl">→</span>
                <span className="whitespace-nowrap">View My Work</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-lg sm:text-xl">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <button 
              onClick={() => window.open('https://github.com/kmoin6231/', '_blank')}
              className={`group relative w-full sm:w-auto px-8 sm:px-14 py-4 sm:py-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-full ${isDarkMode ? 'text-white' : 'text-white'} font-bold text-lg sm:text-xl overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-gray-500/50 hover:rotate-1 transform`}
              data-aos="slide-up"
              data-aos-delay="1000"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl">○</span>
                <span className="whitespace-nowrap">GitHub Profile</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-lg sm:text-xl">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className={`group relative w-full sm:w-auto px-8 sm:px-14 py-4 sm:py-6 border-2 ${isDarkMode ? 'border-white/30' : 'border-gray-300'} rounded-full ${theme.text} font-bold text-lg sm:text-xl backdrop-blur-sm ${isDarkMode ? 'hover:bg-white/20' : 'hover:bg-gray-900/10'} transition-all duration-500 hover:scale-110 hover:border-cyan-400/70 hover:-rotate-2 transform overflow-hidden`}
              data-aos="slide-left"
              data-aos-delay="1200"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl group-hover:scale-125 transition-transform duration-300">•</span>
                <span className="whitespace-nowrap">Get In Touch</span>
                <span className="group-hover:rotate-12 transition-transform duration-300 text-lg sm:text-xl">★</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
            <div className={`w-8 sm:w-10 h-12 sm:h-16 border-2 ${isDarkMode ? 'border-white/40 bg-white/5' : 'border-gray-400 bg-gray-200/20'} rounded-full mx-auto relative backdrop-blur-sm`}>
              <div className="w-1.5 sm:w-2 h-3 sm:h-4 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full mx-auto mt-2 sm:mt-3 animate-pulse shadow-lg"></div>
            </div>
            <p className={`text-xs sm:text-sm ${theme.textMuted} mt-3 font-medium`}>Scroll to explore the universe</p>
          </div>
        </div>

        {/* Enhanced Floating Elements - Responsive */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 border-2 border-purple-400/30 rounded-2xl animate-spin-slow backdrop-blur-sm bg-purple-500/10 shadow-2xl shadow-purple-500/20"></div>
        <div className="absolute top-1/4 right-8 sm:right-20 w-12 sm:w-16 lg:w-24 h-12 sm:h-16 lg:h-24 border-2 border-cyan-400/40 rounded-full animate-bounce backdrop-blur-sm bg-cyan-500/10 shadow-2xl shadow-cyan-500/20"></div>
        <div className="absolute bottom-1/3 left-1/4 w-10 sm:w-16 lg:w-20 h-10 sm:h-16 lg:h-20 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse shadow-2xl shadow-purple-500/30"></div>
        <div className="absolute top-1/2 right-1/4 w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping shadow-lg"></div>
        <div className="absolute bottom-1/4 right-8 sm:right-16 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 border border-pink-400/40 rounded-xl animate-pulse backdrop-blur-sm bg-pink-500/10"></div>
        <div className="absolute top-1/3 left-1/3 w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/2 right-1/3 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border border-purple-400/50 rounded-lg animate-spin-slow"></div>
        
        {/* Particle Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        </div>
      </section>

      {/* About Section - Responsive */}
      <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-16 sm:w-24 lg:w-32 h-1 sm:h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10 order-2 lg:order-1">
              <div className="relative">
                <p className={`text-xl sm:text-2xl lg:text-3xl ${theme.textSecondary} leading-relaxed font-light mb-6 sm:mb-8`}>
                  Hi, I'm <span className="text-purple-400 font-bold">Moin Khan</span> - a passionate full-stack developer 
                  specializing in creating <span className="text-cyan-400 font-bold">professional websites</span> for businesses and 
                  <span className="text-pink-400 font-bold">extraordinary</span> user experiences.
                </p>
                <div className="absolute -left-2 sm:-left-4 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full"></div>
              </div>
              
              <p className={`text-lg sm:text-xl ${theme.textMuted} leading-relaxed`}>
                I work with clients to build <span className={`${theme.text} font-semibold`}>professional websites</span> and 
                web applications using modern technologies. From service-based businesses to complex applications, 
                I deliver solutions that not only look amazing but drive real business results.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="group bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-400/30 hover:border-purple-400/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <span className="text-purple-400 text-2xl sm:text-3xl mr-3 sm:mr-4 group-hover:scale-125 transition-transform duration-300">⚡</span> 
                    <span className={`${theme.text} font-bold text-base sm:text-lg`}>Innovation-driven</span>
                  </div>
                  <p className={`${theme.textMuted} text-xs sm:text-sm`}>Pushing boundaries with creative solutions</p>
                </div>
                
                <div className="group bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-cyan-400/30 hover:border-cyan-400/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <span className="text-cyan-400 text-2xl sm:text-3xl mr-3 sm:mr-4 group-hover:scale-125 transition-transform duration-300">◊</span> 
                    <span className={`${theme.text} font-bold text-base sm:text-lg`}>Performance-focused</span>
                  </div>
                  <p className={`${theme.textMuted} text-xs sm:text-sm`}>Optimized for speed and efficiency</p>
                </div>
                
                <div className="group bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-400/30 hover:border-green-400/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <span className="text-green-400 text-2xl sm:text-3xl mr-3 sm:mr-4 group-hover:scale-125 transition-transform duration-300">◯</span> 
                    <span className={`${theme.text} font-bold text-base sm:text-lg`}>Detail-oriented</span>
                  </div>
                  <p className={`${theme.textMuted} text-xs sm:text-sm`}>Precision in every line of code</p>
                </div>
                
                <div className="group bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-pink-400/30 hover:border-pink-400/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <span className="text-pink-400 text-2xl sm:text-3xl mr-3 sm:mr-4 group-hover:scale-125 transition-transform duration-300">◈</span> 
                    <span className={`${theme.text} font-bold text-base sm:text-lg`}>Client-focused</span>
                  </div>
                  <p className={`${theme.textMuted} text-xs sm:text-sm`}>Building solutions that drive business success</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative flex justify-center">
                <div className="relative">
                  {/* Main Avatar Circle - Responsive sizes */}
                  <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full backdrop-blur-sm border-2 border-white/30 flex items-center justify-center hover:scale-105 transition-all duration-700 hover:rotate-3 shadow-2xl">
                    <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-600 rounded-full flex items-center justify-center text-6xl sm:text-7xl lg:text-9xl hover:rotate-12 transition-transform duration-700 shadow-inner">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">{ }</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-cyan-400/20 animate-spin-slow"></div>
                  </div>
                  
                  {/* Orbiting Elements - Responsive */}
                  <div className="absolute top-0 left-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-purple-400 rounded-full animate-pulse transform -translate-x-1/2 -translate-y-2 sm:-translate-y-3"></div>
                  <div className="absolute bottom-0 left-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-cyan-400 rounded-full animate-pulse transform -translate-x-1/2 translate-y-2 sm:translate-y-3"></div>
                  <div className="absolute top-1/2 left-0 w-4 h-4 sm:w-6 sm:h-6 bg-pink-400 rounded-full animate-pulse transform -translate-y-1/2 -translate-x-2 sm:-translate-x-3"></div>
                  <div className="absolute top-1/2 right-0 w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full animate-pulse transform -translate-y-1/2 translate-x-2 sm:translate-x-3"></div>
                </div>
                
                {/* Enhanced Floating Stats - Responsive and hidden on small screens */}
                <div className="hidden sm:block absolute -top-4 sm:-top-8 -right-4 sm:-right-8 group bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-sm hover:scale-110 transition-all duration-500 cursor-pointer shadow-2xl shadow-purple-500/30 border border-purple-300/30">
                  <div className="text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">5+</div>
                  <div className="text-xs sm:text-sm text-gray-100 font-semibold">Years Experience</div>
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 sm:w-4 h-2 sm:h-4 bg-white rounded-full animate-ping"></div>
                </div>
                
                <div className="hidden sm:block absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 group bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-sm hover:scale-110 transition-all duration-500 cursor-pointer shadow-2xl shadow-cyan-500/30 border border-cyan-300/30">
                  <div className="text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
                  <div className="text-xs sm:text-sm text-gray-100 font-semibold">Client Projects</div>
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 sm:w-4 h-2 sm:h-4 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                </div>
                
                <div className="hidden lg:block absolute top-1/2 -right-8 lg:-right-12 group bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:scale-110 transition-all duration-500 cursor-pointer shadow-2xl shadow-pink-500/30 border border-pink-300/30 transform -translate-y-1/2">
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-xs text-gray-100 font-semibold">Available</div>
                </div>
                
                <div className="hidden lg:block absolute top-1/4 -left-8 lg:-left-12 group bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:scale-110 transition-all duration-500 cursor-pointer shadow-2xl shadow-green-500/30 border border-green-300/30">
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-xs text-gray-100 font-semibold">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Terminal Demo Section */}
          <div className="mt-16 sm:mt-20 lg:mt-24" data-aos="fade-up" data-aos-delay="200">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${theme.text} mb-4`}>
                <GlitchTyping 
                  text="Watch Me Code"
                  speed={120}
                  glitchChance={0.15}
                  className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
                />
              </h3>
              <p className={`${theme.textMuted} text-base sm:text-lg`}>
                Real-time coding demonstration
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <TerminalTyping 
                commands={[
                  {
                    command: "npm create vite@latest awesome-project",
                    output: "✅ Project created successfully!\n📦 Installing dependencies..."
                  },
                  {
                    command: "cd awesome-project && npm install",
                    output: "⚡ Dependencies installed\n🎉 Ready to code!"
                  },
                  {
                    command: "npm run dev",
                    output: "🚀 Local server running on http://localhost:3000\n✨ Hot reload enabled"
                  },
                  {
                    command: "git add . && git commit -m 'feat: amazing new feature'",
                    output: "📝 Changes committed\n🌟 Ready for deployment!"
                  }
                ]}
                speed={60}
                pauseBetweenCommands={2000}
                className="mx-auto shadow-2xl shadow-purple-500/20 border border-purple-400/20"
              />
            </div>
          </div>
          
          {/* Animated Stats Section */}
          <StatsSection isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* Skills Section - Responsive */}
      <section id="skills" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-24" data-aos="fade-up">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className={`text-lg sm:text-xl ${theme.textMuted} max-w-2xl mx-auto px-4 sm:px-0`}>
              <WordByWordTyping 
                text="Mastering the latest technologies to build extraordinary digital experiences"
                speed={120}
                startDelay={300}
                className="inline"
              />
            </div>
            <div className="w-16 sm:w-24 lg:w-32 h-1 sm:h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mx-auto mt-4 sm:mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Suspense fallback={
              <div className="flex justify-center items-center p-8">
                <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              {skills.map((skill, index) => (
                <LazySkillCard 
                  key={skill.name} 
                  skill={skill} 
                  index={index} 
                  isDarkMode={isDarkMode}
                />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Projects Section - Responsive */}
      <section id="projects" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-24" data-aos="fade-up">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
              {/* <GlitchTypewriter 
                text="Featured Projects"
                speed={100}
                glitchChance={0.08}
                glitchDuration={150}
                startDelay={500}
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
              /> */}
            </h2>
            <p className={`text-lg sm:text-xl ${theme.textMuted} max-w-3xl mx-auto px-4 sm:px-0`}>
              Showcasing innovative solutions and real client success stories
            </p>
            <div className="w-16 sm:w-24 lg:w-32 h-1 sm:h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mx-auto mt-4 sm:mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            <Suspense fallback={
              <div className="flex justify-center items-center p-8">
                <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              {projects.map((project, index) => (
                <LazyProjectCard 
                  key={project.title} 
                  project={project} 
                  index={index} 
                  isDarkMode={isDarkMode}
                />
              ))}
            </Suspense>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-16" data-aos="fade-up" data-aos-delay="400">
            <p className={`text-base sm:text-lg ${theme.textMuted} mb-4 sm:mb-6 px-4 sm:px-0`}>Want to see more projects or discuss a custom solution?</p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-bold text-base sm:text-lg overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl">•</span>
                <span>Let's Discuss Your Project</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Live Coding Demo Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Live Coding Demo
              {/* <GlitchTypewriter 
                text="Live Coding Demo"
                speed={120}
                glitchChance={0.12}
                glitchDuration={180}
                startDelay={300}
                className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
              /> */}
            </h2>
            <p className={`text-lg ${theme.textMuted} max-w-2xl mx-auto`}>
              Watch me code in real-time - building a React component from scratch
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            {/* Temporarily disabled - <CodeTypingEffect 
              code={`// Building an interactive portfolio component
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PortfolioCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [likes, setLikes] = useState(project.likes || 0);
  
  const handleLike = () => {
    setLikes(prev => prev + 1);
    // Animate confetti effect
    createConfetti();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative overflow-hidden rounded-lg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-64 object-cover"
      />
      
      <motion.div
        initial={false}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20 
        }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end"
      >
        <div className="p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm opacity-90 mb-4">{project.description}</p>
          
          <button 
            onClick={handleLike}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            ❤️ {likes}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioCard;`}
              language="javascript"
              speed={30}
              showLineNumbers={true}
              className="shadow-2xl shadow-green-500/20"
            /> */}
            
            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg p-6 shadow-2xl shadow-green-500/20`}>
              <div className="flex items-center mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className={`ml-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>javascript</span>
              </div>
              <div className={`font-mono text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                <p>// Live coding demo coming soon...</p>
                <p>const portfolio = "Universe's Best";</p>
                <p>console.log("Ready to build amazing things!");</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Responsive */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Let's Create Magic
              {/* <GlitchTypewriter 
                text="Let's Create Magic"
                speed={120}
                glitchChance={0.1}
                glitchDuration={200}
                startDelay={400}
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
              /> */}
            </h2>
            <p className={`text-lg sm:text-xl lg:text-2xl ${theme.textSecondary} mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0`}>
              Ready to transform your ideas into <span className="text-purple-400 font-bold">extraordinary</span> digital experiences?
            </p>
            <div className="w-20 sm:w-32 lg:w-40 h-1 sm:h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mx-auto"></div>
          </div>
          
          {/* Enhanced Contact Cards - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="group relative p-6 sm:p-8 glassmorphism-enhanced rounded-3xl hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 neon-border">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-125 transition-transform duration-300">✉</div>
              <h3 className={`text-xl sm:text-2xl font-bold ${theme.text} mb-2 sm:mb-3 group-hover:text-purple-300 transition-colors duration-300`}>Email</h3>
              <p className={`${theme.textSecondary} text-base sm:text-lg font-medium`}>kmoin6231@gmail.com</p>
              <div className="absolute top-4 right-4 w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-4 sm:w-6 h-4 sm:h-6 bg-purple-400/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="group relative p-6 sm:p-8 glassmorphism-enhanced rounded-3xl hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25 neon-border">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-125 transition-transform duration-300">○</div>
              <h3 className={`text-xl sm:text-2xl font-bold ${theme.text} mb-2 sm:mb-3 group-hover:text-cyan-300 transition-colors duration-300`}>Phone</h3>
              <p className={`${theme.textSecondary} text-base sm:text-lg font-medium`}>+91 9699577060</p>
              <div className="absolute top-4 right-4 w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-4 sm:w-6 h-4 sm:h-6 bg-cyan-400/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="group relative p-6 sm:p-8 glassmorphism-enhanced rounded-3xl hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/25 neon-border sm:col-span-2 lg:col-span-1">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-125 transition-transform duration-300">◊</div>
              <h3 className={`text-xl sm:text-2xl font-bold ${theme.text} mb-2 sm:mb-3 group-hover:text-pink-300 transition-colors duration-300`}>Location</h3>
              <p className={`${theme.textSecondary} text-base sm:text-lg font-medium`}>San Francisco, CA</p>
              <div className="absolute top-4 right-4 w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-4 sm:w-6 h-4 sm:h-6 bg-pink-400/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Enhanced CTA Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center mb-12 sm:mb-16">
            <button className="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-bold text-lg sm:text-xl overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 hover:rotate-1">
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl group-hover:scale-125 transition-transform duration-300">→</span>
                <span>Start a Project</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <button className={`group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 border-2 ${isDarkMode ? 'border-white/30 text-white hover:bg-white/20' : 'border-gray-400 text-gray-900 hover:bg-gray-900/10'} rounded-full font-bold text-lg sm:text-xl backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-cyan-400/70 hover:-rotate-1`}>
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl group-hover:scale-125 transition-transform duration-300">○</span>
                <span>Download Resume</span>
                <span className="group-hover:rotate-12 transition-transform duration-300 text-lg sm:text-xl">★</span>
              </span>
            </button>
          </div>
          
          {/* Enhanced Social Links - Responsive */}
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <button 
              onClick={() => window.open('https://linkedin.com/in/kmoin6231', '_blank')}
              className="group w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/50 hover:rotate-12 relative overflow-hidden"
            >
              <span className="text-white font-bold text-sm sm:text-lg relative z-10 group-hover:scale-125 transition-transform duration-300">Li</span>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => window.open('https://github.com/kmoin6231/', '_blank')}
              className="group w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-500/50 hover:-rotate-12 relative overflow-hidden"
            >
              <span className="text-white font-bold text-sm sm:text-lg relative z-10 group-hover:scale-125 transition-transform duration-300">Git</span>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/50 hover:rotate-12 relative overflow-hidden">
              <span className="text-white font-bold text-sm sm:text-lg relative z-10 group-hover:scale-125 transition-transform duration-300">Tw</span>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/50 hover:-rotate-12 relative overflow-hidden">
              <span className="text-white font-bold text-sm sm:text-lg relative z-10 group-hover:scale-125 transition-transform duration-300">Ig</span>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
          
          {/* Floating Elements - Responsive */}
          <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-2 sm:w-4 h-2 sm:h-4 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 w-2 sm:w-4 h-2 sm:h-4 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-12 sm:right-20 w-1.5 sm:w-3 h-1.5 sm:h-3 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/3 left-12 sm:left-20 w-1.5 sm:w-3 h-1.5 sm:h-3 bg-green-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer className={`py-6 sm:py-8 px-4 sm:px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-300'} relative z-10`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={`text-sm sm:text-base ${theme.textMuted}`}>
            © 2025 Moin Khan. Crafted with ❤️ and ⚡ by the universe's best developer.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
