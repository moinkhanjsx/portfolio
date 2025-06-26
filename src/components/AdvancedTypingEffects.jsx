import { useState, useEffect } from 'react'

export const GlitchTypewriter = ({ 
  text, 
  speed = 80, 
  glitchChance = 0.1,
  glitchDuration = 200,
  className = "",
  onComplete = () => {},
  startDelay = 0
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const glitchChars = '!@#$%^&*(){}[]<>?/\\|~`+='
  
  useEffect(() => {
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        setHasStarted(true)
      }, startDelay)
      return () => clearTimeout(startTimer)
    } else {
      setHasStarted(true)
    }
  }, [startDelay])

  useEffect(() => {
    if (!hasStarted || currentIndex >= text.length) {
      if (currentIndex >= text.length) {
        onComplete()
      }
      return
    }

    const timer = setTimeout(() => {
      // Glitch effect chance
      if (Math.random() < glitchChance && !isGlitching) {
        setIsGlitching(true)
        
        // Show glitch characters
        const glitchText = displayText + glitchChars[Math.floor(Math.random() * glitchChars.length)]
        setDisplayText(glitchText)
        
        setTimeout(() => {
          setDisplayText(text.substring(0, currentIndex + 1))
          setCurrentIndex(prev => prev + 1)
          setIsGlitching(false)
        }, glitchDuration)
      } else {
        setDisplayText(text.substring(0, currentIndex + 1))
        setCurrentIndex(prev => prev + 1)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [currentIndex, text, speed, glitchChance, glitchDuration, isGlitching, hasStarted])

  return (
    <span className={`${className} ${isGlitching ? 'animate-pulse text-red-400' : ''}`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export const CodeTypingEffect = ({ 
  code, 
  language = 'javascript',
  speed = 50,
  className = "",
  showLineNumbers = true 
}) => {
  const [displayedCode, setDisplayedCode] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex >= code.length) return

    const timer = setTimeout(() => {
      setDisplayedCode(code.substring(0, currentIndex + 1))
      setCurrentIndex(prev => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [currentIndex, code, speed])

  const lines = displayedCode.split('\n')
  const totalLines = code.split('\n').length

  return (
    <div className={`bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-hidden ${className}`}>
      <div className="flex items-center mb-3 pb-2 border-b border-gray-700">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="ml-3 text-gray-400">{language}</span>
      </div>
      <div className="text-left">
        {lines.map((line, index) => (
          <div key={index} className="flex">
            {showLineNumbers && (
              <span className="text-gray-500 w-8 text-right mr-3 select-none">
                {index + 1}
              </span>
            )}
            <span className="text-green-400">
              {line}
              {index === lines.length - 1 && currentIndex < code.length && (
                <span className="animate-pulse bg-green-400 w-2 inline-block">_</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const InteractiveTyping = ({ 
  placeholder, 
  onType = () => {},
  className = "" 
}) => {
  const [currentText, setCurrentText] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  useEffect(() => {
    if (!showPlaceholder) return

    const timer = setTimeout(() => {
      if (placeholderIndex < placeholder.length) {
        setPlaceholderIndex(prev => prev + 1)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [placeholderIndex, placeholder.length, showPlaceholder])

  const handleFocus = () => {
    setShowPlaceholder(false)
  }

  const handleBlur = () => {
    if (currentText === '') {
      setShowPlaceholder(true)
      setPlaceholderIndex(0)
    }
  }

  const handleChange = (e) => {
    setCurrentText(e.target.value)
    onType(e.target.value)
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={currentText}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${className} bg-transparent`}
      />
      {showPlaceholder && currentText === '' && (
        <div className="absolute inset-0 pointer-events-none flex items-center px-3">
          <span className="text-gray-500">
            {placeholder.substring(0, placeholderIndex)}
            <span className="animate-pulse">|</span>
          </span>
        </div>
      )}
    </div>
  )
}
