import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">⚠️ Something went wrong</h2>
            <p className="text-gray-400 mb-4">The application encountered an unexpected error.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-purple-300 border-solid rounded-full animate-spin border-t-purple-600"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-12 border-4 border-cyan-300 border-solid rounded-full animate-spin border-t-cyan-600 animate-reverse"></div>
      </div>
    </div>
  </div>
)

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
  const [hoveredProject, setHoveredProject] = useState(null)
  const [hoverPreview, setHoverPreview] = useState({ project: null, position: null })
  const [hoverTimeout, setHoverTimeout] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

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
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const bodyOverflow = window.getComputedStyle(document.body).overflow
        const htmlOverflow = window.getComputedStyle(document.documentElement).overflow
        
        if (bodyOverflow === 'hidden' || htmlOverflow === 'hidden') {
          console.warn('Scroll may be blocked:', { bodyOverflow, htmlOverflow })
        }
      }
    }
    
    // Check for scroll blocks periodically
    const intervalId = setInterval(debugScrollIssues, 2000)
    
    return () => {
      clearInterval(intervalId)
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  // Mouse tracking for interactive effects - optimized with useCallback
  const handleMouseMove = useCallback((e) => {
    if (e && e.clientX !== undefined && e.clientY !== undefined) {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined' || !document.documentElement) return
      
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scroll = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0
      
      setScrollProgress(scroll)
      setShowBackToTop(totalScroll > 300)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Smooth scroll to section - optimized with useCallback
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Get the header height for proper offset
      const header = document.querySelector('nav')
      const headerHeight = header ? header.offsetHeight : 80
      const offsetTop = element.offsetTop - headerHeight - 20
      
      // Ensure we're not in a modal state that might interfere
      if (document.body.style.overflow !== 'hidden' && typeof window !== 'undefined') {
        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: 'smooth'
        })
      }
    }
    setIsMenuOpen(false)
  }, [])

  // Skills data
  const skills = [
    { name: 'React', level: 95, icon: '⚛️', color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', level: 92, icon: '📝', color: 'from-yellow-400 to-orange-500' },
    { name: 'TypeScript', level: 88, icon: '🔷', color: 'from-blue-500 to-indigo-600' },
    { name: 'Node.js', level: 85, icon: '🟢', color: 'from-green-400 to-green-600' },
    { name: 'Express.js', level: 88, icon: '🚀', color: 'from-gray-600 to-gray-800' },
    { name: 'MongoDB', level: 82, icon: '🍃', color: 'from-green-500 to-green-700' },
    { name: 'HTML', level: 95, icon: '🌐', color: 'from-orange-400 to-red-500' },
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

  // Performance: Memoize expensive calculations
  const skillsWithAnimationDelay = useMemo(() => 
    skills.map((skill, index) => ({
      ...skill,
      animationDelay: index * 100
    })),
    [skills]
  )

  const featuredProjects = useMemo(() => 
    projects.filter(project => project.featured),
    [projects]
  )

  // Hover Preview Component
  const HoverPreview = ({ project, position, isDarkMode }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [showIframe, setShowIframe] = useState(false)

    // Animate appearance
    useEffect(() => {
      if (project && position) {
        setIsVisible(true)
        setIsLoading(true)
        setHasError(false)
        setShowIframe(false)
        
        // Delay iframe loading to first show project info
        const iframeTimeout = setTimeout(() => {
          setShowIframe(true)
        }, 200)
        
        return () => clearTimeout(iframeTimeout)
      } else {
        setIsVisible(false)
      }
    }, [project, position])

    if (!project || !position) return null

    return (
      <div 
        className={`fixed z-[90] pointer-events-none transition-all duration-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          left: typeof window !== 'undefined' 
            ? (window.innerWidth < 640 
              ? Math.max(10, Math.min(position.x - 160, window.innerWidth - 340)) 
              : (position.x > window.innerWidth / 2 ? position.x - 340 : position.x + 20))
            : position.x + 20,
          top: typeof window !== 'undefined' ? Math.max(20, Math.min(position.y - 150, window.innerHeight - 280)) : position.y - 150,
        }}
      >
        <div className={`w-80 sm:w-80 max-w-[90vw] h-60 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-2 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm`}>
          {/* Header */}
          <div className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b flex items-center justify-between`}>
            <div>
              <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {project.title}
              </h4>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Live Preview
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>LIVE</span>
            </div>
          </div>

          {/* Preview Content */}
          <div className="relative h-[calc(100%-50px)]">
            {/* Project Info - Always show first */}
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 flex flex-col justify-center ${showIframe && !hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
              <div className="text-center">
                <div className="text-3xl mb-3">🌐</div>
                <h5 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {project.title}
                </h5>
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 leading-relaxed`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={`px-2 py-1 ${isDarkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'} rounded-full text-xs`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Click to open live site →
                </p>
              </div>
            </div>

            {/* Iframe Preview - Try to load after project info */}
            {showIframe && (
              <>
                {isLoading && !hasError && (
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center z-10`}>
                    <div className="text-center">
                      <div className="animate-spin w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading live preview...</p>
                    </div>
                  </div>
                )}
                
                <iframe
                  src={project.liveUrl}
                  title={`${project.title} hover preview`}
                  className={`w-full h-full border-0 ${hasError ? 'hidden' : ''}`}
                  style={{ 
                    transform: 'scale(0.8)',
                    transformOrigin: 'top left',
                    width: '125%', 
                    height: '125%'
                  }}
                  loading="lazy"
                  sandbox="allow-same-origin allow-scripts"
                  onLoad={() => {
                    setIsLoading(false)
                    setHasError(false)
                  }}
                  onError={() => {
                    setIsLoading(false)
                    setHasError(true)
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Preview Modal Component
  const PreviewModal = ({ isOpen, project, onClose, isDarkMode }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [loadTimeout, setLoadTimeout] = useState(false)
    const [iframeBlocked, setIframeBlocked] = useState(false)

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
        // Ensure modal-open class is removed when modal is closed
        document.body.classList.remove('modal-open')
      }
    }, [isOpen, onClose])

    // Reset loading state when modal opens
    useEffect(() => {
      if (isOpen) {
        setIsLoading(true)
        setHasError(false)
        setLoadTimeout(false)
        setIframeBlocked(false)
        
        // Set a timeout for loading - shorter timeout for better UX
        const timer = setTimeout(() => {
          setLoadTimeout(true)
          setIframeBlocked(true) // Assume blocked if taking too long
          setIsLoading(false)
        }, 5000) // 5 seconds timeout - most blocked iframes fail quickly
        
        return () => clearTimeout(timer)
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
            {isLoading && !iframeBlocked && (
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center z-10`}>
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading preview...</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Press Escape to close</p>
                </div>
              </div>
            )}

            {/* Iframe Blocked/Error Fallback */}
            {(iframeBlocked || hasError || loadTimeout) && (
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center z-10`}>
                <div className="text-center max-w-md mx-auto p-8">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h4 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Preview Not Available
                  </h4>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
                    This website cannot be previewed in an iframe due to security restrictions. 
                    This is a common security feature that prevents embedding.
                  </p>
                  <button
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                  >
                    View Full Site →
                  </button>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
                    Opens in a new tab
                  </p>
                </div>
              </div>
            )}
            
            <iframe
              src={project.liveUrl}
              title={`${project.title} Preview`}
              className={`w-full h-full border-0 ${(iframeBlocked || hasError || loadTimeout) ? 'hidden' : ''}`}
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock"
              onLoad={(e) => {
                // Check if iframe actually loaded content or was blocked
                try {
                  const iframe = e.target
                  // Try to access iframe content to detect blocking
                  if (iframe.contentWindow && iframe.contentWindow.location.href === 'about:blank') {
                    setIframeBlocked(true)
                    setHasError(true)
                  } else {
                    setIsLoading(false)
                    setIframeBlocked(false)
                    setHasError(false)
                    setLoadTimeout(false)
                  }
                } catch (error) {
                  // If we can't access iframe content, it might be blocked or loaded
                  // For cross-origin iframes, this is expected, so we assume success
                  setIsLoading(false)
                  setIframeBlocked(false)
                  setHasError(false)
                  setLoadTimeout(false)
                }
              }}
              onError={() => {
                setIsLoading(false)
                setHasError(true)
                setIframeBlocked(true)
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Early return for loading state
  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>
      {/* Scroll Progress Bar */}
      <div className={`fixed top-0 left-0 w-full h-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} z-50`}>
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => scrollToSection('home')}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 animate-pulse-glow"
          title="Back to top"
        >
          <span className="text-xl">↑</span>
        </button>
      )}
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
                className={`relative p-3 rounded-full ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-200'} border transition-all duration-500 hover:scale-110 btn-enhanced group overflow-hidden`}
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                <div className="relative z-10 transition-all duration-500">
                  {isDarkMode ? (
                    <span className="text-yellow-400 text-xl animate-pulse">☀️</span>
                  ) : (
                    <span className="text-purple-600 text-xl">🌙</span>
                  )}
                </div>
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20' : 'bg-gradient-to-r from-purple-400/20 to-blue-400/20'} opacity-0 group-hover:opacity-100`}></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative p-2 rounded-full ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-200'} border transition-all duration-500 btn-enhanced group overflow-hidden`}
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                <div className="relative z-10 transition-all duration-500">
                  {isDarkMode ? (
                    <span className="text-yellow-400 text-sm animate-pulse">☀️</span>
                  ) : (
                    <span className="text-purple-600 text-sm">🌙</span>
                  )}
                </div>
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20' : 'bg-gradient-to-r from-purple-400/20 to-blue-400/20'} opacity-0 group-hover:opacity-100`}></div>
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
            <h1 className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[10rem] font-black mb-8 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent leading-none`}>
              <SimpleTyping text="MOIN KHAN" speed={120} />
            </h1>
            
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-10 ${isDarkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
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
          <h2 className={`text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent`}>
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
                  Node.js, Express, REST APIs, MongoDB, PostgreSQL, MySQL
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

      {/* Skills Section - Premium Enhanced */}
      <section id="skills" className="py-32 px-4 sm:px-6 relative overflow-hidden" data-aos="fade-up">
        {/* Dynamic Background with Multiple Layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated Grid Pattern */}
          <div className={`absolute inset-0 opacity-5 ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`} 
               style={{
                 backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                 backgroundSize: '40px 40px',
                 animation: 'float 20s ease-in-out infinite'
               }}>
          </div>
          
          {/* Floating Orbs with Enhanced Animation */}
          <div className={`absolute top-20 left-10 w-40 h-40 ${isDarkMode ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-r from-purple-300/30 to-pink-300/30'} rounded-full blur-3xl`}
               style={{ animation: 'float 8s ease-in-out infinite' }}></div>
          <div className={`absolute top-40 right-20 w-32 h-32 ${isDarkMode ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20' : 'bg-gradient-to-r from-cyan-300/30 to-blue-300/30'} rounded-full blur-3xl`}
               style={{ animation: 'float 12s ease-in-out infinite reverse', animationDelay: '2s' }}></div>
          <div className={`absolute bottom-32 left-1/3 w-24 h-24 ${isDarkMode ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20' : 'bg-gradient-to-r from-green-300/30 to-teal-300/30'} rounded-full blur-3xl`}
               style={{ animation: 'float 15s ease-in-out infinite', animationDelay: '4s' }}></div>
          <div className={`absolute bottom-20 right-10 w-36 h-36 ${isDarkMode ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20' : 'bg-gradient-to-r from-orange-300/30 to-red-300/30'} rounded-full blur-3xl`}
               style={{ animation: 'float 10s ease-in-out infinite reverse', animationDelay: '6s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Enhanced Header Section */}
          <div className="text-center mb-24">
            <div className="relative inline-block">
              <h2 className={`text-4xl sm:text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent`}
                  style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 4s ease-in-out infinite' }}>
                Skills & Expertise
              </h2>
              {/* Glowing underline */}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r ${isDarkMode ? 'from-purple-500 to-cyan-500' : 'from-purple-600 to-cyan-600'} rounded-full`}
                   style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
            </div>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed mt-6`}>
              Crafting digital experiences with a perfect blend of creativity and technical mastery
            </p>
          </div>
          
          {/* Revolutionary Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {skillsWithAnimationDelay.map((skill, index) => (
              <div 
                key={skill.name} 
                className={`group relative ${isDarkMode ? 'bg-gray-800/20' : 'bg-white/40'} backdrop-blur-xl rounded-3xl p-8 border ${isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30'} transition-all duration-700 hover:scale-110 hover:-rotate-2 cursor-pointer overflow-hidden`}
                data-aos="zoom-in" 
                data-aos-delay={index * 100}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.7s cubic-bezier(0.23, 1, 0.320, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) rotateY(5deg) rotateX(5deg)'
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? `0 20px 60px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.2)`
                    : `0 20px 60px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.1)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>
                
                {/* Skill Icon with 3D Effect */}
                <div className="relative mb-8 flex justify-center">
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 scale-150`}></div>
                    {/* Icon Container */}
                    <div className={`relative w-20 h-20 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center text-3xl shadow-2xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}
                         style={{ 
                           boxShadow: isDarkMode 
                             ? '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                             : '0 10px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)'
                         }}>
                      <span className="drop-shadow-lg">{skill.icon}</span>
                      {/* Shine overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    {/* Floating particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-1 h-1 bg-gradient-to-r ${skill.color} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000`}
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${10 + i * 20}%`,
                            animation: `float ${3 + i}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skill Name with Enhanced Typography */}
                <h3 className={`text-xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${skill.color} group-hover:bg-clip-text transition-all duration-500 transform group-hover:scale-105`}>
                  {skill.name}
                </h3>

                {/* Revolutionary Progress Ring */}
                <div className="relative flex justify-center mb-6">
                  <div className="relative w-24 h-24">
                    {/* Background Circle */}
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                        strokeWidth="8"
                        fill="none"
                        className="opacity-20"
                      />
                      {/* Progress Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - skill.level / 100)}`}
                        className="transition-all duration-1000 ease-out"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.5))' }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Percentage in Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skill Proficiency Label */}
                <div className="text-center">
                  <span className={`text-sm font-medium px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600'} group-hover:bg-gradient-to-r group-hover:${skill.color} group-hover:text-white transition-all duration-300`}>
                    {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
                  </span>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color} opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300`}></div>
                </div>

                {/* Bottom Corner Shine */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Enhanced Statistics Dashboard */}
          <div className={`relative ${isDarkMode ? 'bg-gray-800/20' : 'bg-white/40'} backdrop-blur-xl rounded-3xl p-12 border ${isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30'}`}>
            <h3 className={`text-2xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Development Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '8+', label: 'Technologies', color: 'from-purple-500 to-purple-700', icon: '🚀' },
                { value: '5+', label: 'Years Experience', color: 'from-cyan-500 to-cyan-700', icon: '⏱️' },
                { value: '50+', label: 'Projects Built', color: 'from-pink-500 to-pink-700', icon: '💼' },
                { value: '90%+', label: 'Avg Proficiency', color: 'from-orange-500 to-orange-700', icon: '⭐' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center group" data-aos="fade-up" data-aos-delay={index * 150}>
                  <div className={`text-4xl mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-black group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} group-hover:text-purple-500 transition-colors duration-300`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 relative" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent`}>
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.title} 
                className={`group relative ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-xl overflow-hidden border card-hover-effect animate-fade-in-scale transition-all duration-300`} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                onMouseEnter={(e) => {
                  // Only show hover preview on non-touch devices
                  if (project.liveUrl && project.previewable && !('ontouchstart' in window)) {
                    // Clear any existing timeout
                    if (hoverTimeout) {
                      clearTimeout(hoverTimeout)
                    }
                    
                    // Set a small delay before showing preview
                    const timeout = setTimeout(() => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setHoverPreview({
                        project,
                        position: {
                          x: rect.right,
                          y: rect.top + rect.height / 2
                        }
                      })
                    }, 150) // Reduced delay for better responsiveness
                    
                    setHoverTimeout(timeout)
                  }
                }}
                onMouseLeave={() => {
                  // Clear timeout and hide preview
                  if (hoverTimeout) {
                    clearTimeout(hoverTimeout)
                    setHoverTimeout(null)
                  }
                  setHoverPreview({ project: null, position: null })
                }}
              >
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
                          {project.previewable ? 'Hover for preview • Click for fullscreen' : 'Click to Open'}
                        </div>
                      </div>
                      
                      {/* Live indicator */}
                      <div className="absolute top-3 right-3">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span>LIVE</span>
                        </div>
                      </div>

                      {/* Hover preview indicator */}
                      {project.previewable && (
                        <div className="absolute top-3 left-3">
                          <div className={`${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1`}>
                            <span>👁️</span>
                            <span>HOVER</span>
                          </div>
                        </div>
                      )}
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
                        className="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                        title="Quick preview in modal"
                      >
                        <span>👁️</span>
                        <span className="hidden sm:inline">Preview</span>
                      </button>
                    )}
                    {project.liveUrl && (
                      <button 
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className={`${project.previewable ? 'flex-1' : 'flex-1'} py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 text-sm flex items-center justify-center space-x-1`}
                        title="Open full site in new tab"
                      >
                        <span>↗️</span>
                        <span className="hidden sm:inline">Visit Site</span>
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

      {/* Statistics Section */}
      <section className="py-16 px-4 sm:px-6 relative overflow-hidden" data-aos="fade-up">
        <div className="max-w-6xl mx-auto">
          <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/60' : 'bg-gradient-to-br from-white/60 to-gray-50/60'} backdrop-blur-sm rounded-3xl p-12 relative`}>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-pink-500/10 rounded-3xl"></div>
            
            <div className="relative z-10">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 to-cyan-400' : 'from-purple-600 to-cyan-600'} bg-clip-text text-transparent`}>
                By the Numbers
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    50+
                  </div>
                  <div className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Projects Completed
                  </div>
                </div>
                
                <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    3+
                  </div>
                  <div className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Years Experience
                  </div>
                </div>
                
                <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    95%
                  </div>
                  <div className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Client Satisfaction
                  </div>
                </div>
                
                <div className="text-center" data-aos="fade-up" data-aos-delay="400">
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    24/7
                  </div>
                  <div className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Support Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume/CV Section */}
      <section className="py-16 px-4 sm:px-6 relative" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700' : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'} backdrop-blur-sm rounded-3xl p-12 border shadow-2xl`}>
            <div className="text-6xl mb-6">📄</div>
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Download My Resume
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-2xl mx-auto`}>
              Get a detailed overview of my experience, skills, and achievements in a professionally formatted PDF.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                  // Create a simple resume download (you'll need to add an actual PDF file)
                  const link = document.createElement('a')
                  link.href = '/resume-moin-khan.pdf' // You'll need to add this file to public folder
                  link.download = 'Moin-Khan-Resume.pdf'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-3"
              >
                <span>📥</span>
                <span>Download PDF Resume</span>
                <div className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden">
                  <span>→</span>
                </div>
              </button>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center space-x-2`}>
                <span>📊</span>
                <span>Updated December 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 relative" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-pink-400 to-cyan-400' : 'from-purple-600 via-blue-600 to-pink-600'} bg-clip-text text-transparent`}>
            Let's Create Something Amazing
          </h2>
          
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-2xl mx-auto`}>
            Ready to bring your ideas to life? Let's discuss your next project and create something extraordinary together.
          </p>

          {/* Quick Contact Form */}
          <div className={`${isDarkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-white/50 border-gray-200'} backdrop-blur-sm rounded-2xl p-8 border mb-12 max-w-2xl mx-auto`} data-aos="fade-up" data-aos-delay="100">
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Send me a quick message</h3>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const name = formData.get('name')
              const email = formData.get('email')
              const message = formData.get('message')
              const subject = `Portfolio Contact from ${name}`
              const body = `Hi Moin,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`
              window.open(`mailto:kmoin6231@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
            }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="4"
                className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none`}
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Send Message ✉️
              </button>
            </form>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-3xl p-6 border hover:scale-105 transition-all duration-300 flex flex-col justify-between min-h-[200px]`} data-aos="fade-up" data-aos-delay="100">
              <div className="text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Email</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 text-sm`}>Drop me a line anytime</p>
              </div>
              <button 
                onClick={() => window.open('mailto:kmoin6231@gmail.com', '_blank')}
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 text-sm"
              >
                Send Email
              </button>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-3xl p-6 border hover:scale-105 transition-all duration-300 flex flex-col justify-between min-h-[200px]`} data-aos="fade-up" data-aos-delay="200">
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Phone</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 text-sm`}>Let's have a quick chat</p>
              </div>
              <button 
                onClick={() => window.open('tel:+923024060098', '_blank')}
                className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 text-sm"
              >
                Call Now
              </button>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-3xl p-6 border hover:scale-105 transition-all duration-300 flex flex-col justify-between min-h-[200px]`} data-aos="fade-up" data-aos-delay="300">
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>WhatsApp</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 text-sm`}>Quick & direct messaging</p>
              </div>
              <button 
                onClick={() => window.open('https://wa.me/923024060098?text=Hi Moin! I visited your portfolio and would like to discuss a project.', '_blank')}
                className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 text-sm"
              >
                Chat on WhatsApp
              </button>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-3xl p-6 border hover:scale-105 transition-all duration-300 flex flex-col justify-between min-h-[200px]`} data-aos="fade-up" data-aos-delay="400">
              <div className="text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>LinkedIn</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 text-sm`}>Connect professionally</p>
              </div>
              <button 
                onClick={() => window.open('https://linkedin.com/in/kmoin6231', '_blank')}
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 text-sm"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className={`py-12 px-4 sm:px-6 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} relative transition-all duration-500`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Moin Khan
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Full Stack Developer passionate about creating innovative web solutions.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <button 
                  onClick={() => window.open('https://github.com/moinkhan-in', '_blank')}
                  className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center transition-all duration-300 hover:scale-110`}
                  title="GitHub"
                >
                  <span className="text-lg">🐱</span>
                </button>
                <button 
                  onClick={() => window.open('https://linkedin.com/in/kmoin6231', '_blank')}
                  className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center transition-all duration-300 hover:scale-110`}
                  title="LinkedIn"
                >
                  <span className="text-lg">💼</span>
                </button>
                <button 
                  onClick={() => window.open('mailto:kmoin6231@gmail.com', '_blank')}
                  className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center transition-all duration-300 hover:scale-110`}
                  title="Email"
                >
                  <span className="text-lg">📧</span>
                </button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="text-center">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Quick Links
              </h4>
              <div className="space-y-2">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`block mx-auto ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="text-center md:text-right">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Let's Connect
              </h4>
              <div className="space-y-2">
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  📧 kmoin6231@gmail.com
                </p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  📱 +92 302 4060098
                </p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  🌍 Available worldwide
                </p>
              </div>
            </div>
          </div>
          
          <div className={`pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 Moin Khan - Crafted with ❤️ and lots of ☕ | Built with React + Tailwind CSS
            </p>
            <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-sm mt-2`}>
              "Code is like humor. When you have to explain it, it's bad." - Cory House
            </p>
          </div>
        </div>
      </footer>

      {/* Hover Preview */}
      <HoverPreview 
        project={hoverPreview.project}
        position={hoverPreview.position}
        isDarkMode={isDarkMode}
      />

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

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}
