import { useState, useEffect, useRef } from 'react'

const AdvancedTypingAnimation = ({ 
  texts, 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000,
  className = "",
  cursor = true,
  loop = true,
  onComplete = null,
  randomizeSpeed = false,
  showProgress = false 
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef(null)

  const getRandomSpeed = (baseSpeed) => {
    if (!randomizeSpeed) return baseSpeed
    return baseSpeed + Math.random() * 50 - 25 // ±25ms variation
  }

  useEffect(() => {
    if (isComplete && !loop) return

    const text = texts[currentTextIndex]
    const totalLength = text.length
    
    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < text.length) {
          const nextChar = text.substring(0, currentText.length + 1)
          setCurrentText(nextChar)
          setProgress((nextChar.length / totalLength) * 100)
        } else {
          // Finished typing
          if (!loop && currentTextIndex === texts.length - 1) {
            setIsComplete(true)
            if (onComplete) onComplete()
            return
          }
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          const nextText = text.substring(0, currentText.length - 1)
          setCurrentText(nextText)
          setProgress((nextText.length / totalLength) * 100)
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          setProgress(0)
        }
      }
    }, getRandomSpeed(isDeleting ? deleteSpeed : speed))

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime, loop, isComplete, onComplete, randomizeSpeed])

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [cursor])

  return (
    <div className="relative">
      <span className={className}>
        {currentText}
        {cursor && !isComplete && (
          <span 
            className={`ml-1 transition-opacity duration-100 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            } text-purple-400`}
          >
            |
          </span>
        )}
      </span>
      
      {showProgress && (
        <div className="mt-2 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

const GlitchTyping = ({ 
  text, 
  speed = 80,
  glitchChance = 0.1,
  className = "" 
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  useEffect(() => {
    if (currentIndex >= text.length) return

    const timeout = setTimeout(() => {
      if (Math.random() < glitchChance) {
        // Glitch effect
        const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
        setDisplayText(text.substring(0, currentIndex) + glitchChar)
        
        setTimeout(() => {
          setDisplayText(text.substring(0, currentIndex + 1))
          setCurrentIndex(prev => prev + 1)
        }, 100)
      } else {
        // Normal typing
        setDisplayText(text.substring(0, currentIndex + 1))
        setCurrentIndex(prev => prev + 1)
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [currentIndex, text, speed, glitchChance])

  return (
    <span className={className}>
      {displayText}
    </span>
  )
}

const MatrixTyping = ({ 
  text, 
  speed = 100,
  className = "" 
}) => {
  const [visibleChars, setVisibleChars] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleChars(prev => {
        if (prev >= text.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, speed)

    return () => clearInterval(interval)
  }, [text.length, speed])

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-300 ${
            index < visibleChars 
              ? 'opacity-100 text-green-400' 
              : 'opacity-30 text-green-600'
          }`}
          style={{
            animationDelay: `${index * 50}ms`
          }}
        >
          {index < visibleChars ? char : (Math.random() > 0.7 ? char : '█')}
        </span>
      ))}
    </span>
  )
}

export { AdvancedTypingAnimation, GlitchTyping, MatrixTyping }
export default AdvancedTypingAnimation
