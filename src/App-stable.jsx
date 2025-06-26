import { useState, useEffect, lazy, Suspense } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'
import TypingAnimation from './components/TypingAnimation'
import { WordByWordTyping } from './components/AnimatedText'
import { TerminalTyping } from './components/CodeTyping'

// Lazy loaded components
const LazySkillCard = lazy(() => import('./components/SkillCard'))
const LazyProjectCard = lazy(() => import('./components/ProjectCard'))

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDarkMode, setIsDarkMode] = useState(true)

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
  }, [])

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  // Mouse tracking for interactive background
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
      title: 'Shoaib Cooling Services',
      description: 'Professional service website for Sayyed Shoaib - specializing in cooling systems repair and maintenance.',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Tailwind CSS', 'JavaScript'],
      liveUrl: 'https://shoaibcoolingservices.netlify.app/',
      githubUrl: 'https://github.com/kmoin1309/Shoaib-Cooling-Services',
      featured: true
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React frontend, Node.js backend, and secure payment integration.',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/kmoin6231/ecommerce-platform',
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'Productivity application with drag-and-drop functionality and real-time collaboration.',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Firebase', 'Material-UI'],
      liveUrl: 'https://taskflow-pro.netlify.app/',
      githubUrl: 'https://github.com/kmoin6231/task-manager',
      featured: true
    }
  ]

  // Theme configuration
  const theme = {
    bg: isDarkMode ? 'bg-black' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    card: isDarkMode ? 'bg-white/5' : 'bg-white/80',
    border: isDarkMode ? 'border-white/10' : 'border-gray-200/50',
    nav: isDarkMode ? 'bg-black/80' : 'bg-white/80',
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} overflow-x-hidden transition-all duration-500`}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            transition: 'all 0.3s ease'
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 ${theme.nav} backdrop-blur-lg border-b ${theme.border} transition-all duration-500`}>
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
                </button>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${theme.card} ${theme.border} border transition-all duration-300 hover:scale-110`}
              >
                {isDarkMode ? (
                  <span className="text-yellow-400 text-xl">☀️</span>
                ) : (
                  <span className="text-purple-400 text-xl">🌙</span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
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
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${theme.card} ${theme.border} border transition-all duration-300`}
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
          <div className={`md:hidden absolute top-16 left-0 w-full ${isDarkMode ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-lg border-b ${theme.border}`}>
            <div className="px-4 sm:px-6 py-4 space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-3 py-2 transition-all duration-300 ${theme.textSecondary} hover:${theme.text}`}
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
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent leading-none">
              UNIVERSE'S BEST
            </h1>
            
            <h2 className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-10 ${theme.text} leading-tight`}>
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
                className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
              />
            </h2>
            
            <div className={`text-lg sm:text-xl md:text-2xl ${theme.textSecondary} mb-16 max-w-4xl mx-auto`}>
              <WordByWordTyping 
                text="Crafting extraordinary digital experiences with cutting-edge technology and innovative solutions"
                speed={150}
                startDelay={1000}
                className="inline"
              />
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mb-16">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-bold text-lg hover:scale-105 transition-all duration-300"
            >
              View My Work
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-purple-400 rounded-full text-purple-400 font-bold text-lg hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h3 className={`text-3xl font-bold ${theme.text} mb-6`}>
                Building Digital Dreams Into Reality
              </h3>
              <div className="space-y-6 text-lg leading-relaxed">
                <p className={theme.textSecondary}>
                  I'm a passionate Full-Stack Developer with over 3 years of experience creating exceptional digital experiences. My expertise spans modern frameworks like React, Node.js, and cutting-edge technologies.
                </p>
                <p className={theme.textSecondary}>
                  From crafting pixel-perfect user interfaces to architecting robust backend systems, I bring a comprehensive approach to every project.
                </p>
              </div>
            </div>
            
            <div data-aos="fade-left">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Live Code Demo
                </h3>
              </div>
              
              <TerminalTyping 
                commands={[
                  {
                    command: "npm create vite@latest awesome-project",
                    output: "✅ Project created successfully!"
                  },
                  {
                    command: "npm run dev",
                    output: "🚀 Local server running on http://localhost:3000"
                  },
                  {
                    command: "git commit -m 'feat: amazing new feature'",
                    output: "📝 Changes committed\n🌟 Ready for deployment!"
                  }
                ]}
                speed={60}
                pauseBetweenCommands={2000}
                className="shadow-2xl shadow-purple-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className={`text-xl ${theme.textMuted} max-w-2xl mx-auto`}>
              <WordByWordTyping 
                text="Mastering the latest technologies to build extraordinary digital experiences"
                speed={120}
                startDelay={300}
                className="inline"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
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

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className={`text-xl ${theme.textMuted} max-w-3xl mx-auto`}>
              Showcasing innovative solutions and real client success stories
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Let's Create Magic
          </h2>
          <div className={`text-xl ${theme.textSecondary} mb-16 max-w-3xl mx-auto`}>
            <WordByWordTyping 
              text="Ready to transform your ideas into extraordinary digital experiences? Let's start the conversation."
              speed={100}
              startDelay={500}
              className="inline"
            />
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className={`${theme.card} backdrop-blur-sm rounded-3xl p-8 border ${theme.border} hover:scale-105 transition-all duration-300`} data-aos="fade-up" data-aos-delay="100">
              <div className="text-5xl mb-6">📧</div>
              <h3 className={`text-xl font-bold ${theme.text} mb-3`}>Email</h3>
              <p className={`${theme.textMuted} mb-6`}>Drop me a line anytime</p>
              <button 
                onClick={() => window.open('mailto:kmoin6231@gmail.com', '_blank')}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                kmoin6231@gmail.com
              </button>
            </div>
            
            <div className={`${theme.card} backdrop-blur-sm rounded-3xl p-8 border ${theme.border} hover:scale-105 transition-all duration-300`} data-aos="fade-up" data-aos-delay="200">
              <div className="text-5xl mb-6">📱</div>
              <h3 className={`text-xl font-bold ${theme.text} mb-3`}>Phone</h3>
              <p className={`${theme.textMuted} mb-6`}>Let's have a quick chat</p>
              <button 
                onClick={() => window.open('tel:+923024060098', '_blank')}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                +92 302 4060098
              </button>
            </div>
            
            <div className={`${theme.card} backdrop-blur-sm rounded-3xl p-8 border ${theme.border} hover:scale-105 transition-all duration-300`} data-aos="fade-up" data-aos-delay="300">
              <div className="text-5xl mb-6">💼</div>
              <h3 className={`text-xl font-bold ${theme.text} mb-3`}>LinkedIn</h3>
              <p className={`${theme.textMuted} mb-6`}>Connect professionally</p>
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
      <footer className={`py-8 px-4 sm:px-6 border-t ${theme.border} relative z-10`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={`${theme.textMuted}`}>
            © 2025 Moin Khan. Crafted with ❤️ and ⚡ by the universe's best developer.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
