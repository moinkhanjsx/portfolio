import React, { useState, useEffect } from 'react'

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

export default HoverPreview
