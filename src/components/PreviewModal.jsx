import React, { useState, useEffect } from 'react'

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

export default PreviewModal
