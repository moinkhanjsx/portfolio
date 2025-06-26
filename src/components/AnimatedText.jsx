import { useState, useEffect } from 'react'

const AnimatedText = ({ 
  children, 
  delay = 0,
  className = "",
  animationType = "fadeInUp" 
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const animationClasses = {
    fadeInUp: 'translate-y-8 opacity-0',
    fadeIn: 'opacity-0',
    slideInLeft: '-translate-x-8 opacity-0',
    slideInRight: 'translate-x-8 opacity-0'
  }

  return (
    <span 
      className={`inline-block transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 translate-x-0' : animationClasses[animationType]
      } ${className}`}
    >
      {children}
    </span>
  )
}

const WordByWordTyping = ({ 
  text, 
  speed = 150,
  className = "",
  startDelay = 0 
}) => {
  const [visibleWords, setVisibleWords] = useState(0)
  const words = text.split(' ')

  useEffect(() => {
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleWords(prev => {
          if (prev >= words.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [words.length, speed, startDelay])

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block">
          <AnimatedText
            delay={0}
            className={`transition-all duration-500 ${
              index < visibleWords 
                ? 'opacity-100 transform-none' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            {word}
          </AnimatedText>
          {index < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

export { AnimatedText, WordByWordTyping }
export default TypingAnimation
