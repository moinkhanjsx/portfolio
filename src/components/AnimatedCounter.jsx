import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  className = "",
  startDelay = 0,
  easing = 'ease-out'
}) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  useEffect(() => {
    if (!inView || hasAnimated) return

    const startTime = Date.now() + startDelay
    const startValue = 0
    const endValue = end

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime

      if (elapsed < 0) {
        requestAnimationFrame(animate)
        return
      }

      if (elapsed < duration) {
        const progress = elapsed / duration
        
        // Easing function
        let easedProgress
        switch (easing) {
          case 'ease-in':
            easedProgress = progress * progress
            break
          case 'ease-out':
            easedProgress = 1 - (1 - progress) * (1 - progress)
            break
          case 'ease-in-out':
            easedProgress = progress < 0.5 
              ? 2 * progress * progress 
              : 1 - 2 * (1 - progress) * (1 - progress)
            break
          default:
            easedProgress = progress
        }

        const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress)
        setCount(currentValue)
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
        setHasAnimated(true)
      }
    }

    animate()
  }, [inView, end, duration, startDelay, easing, hasAnimated])

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export const StatsSection = ({ isDarkMode = true }) => {
  const stats = [
    { 
      number: 50, 
      suffix: '+', 
      label: 'Projects Completed',
      icon: '🚀',
      delay: 0
    },
    { 
      number: 100, 
      suffix: '%', 
      label: 'Client Satisfaction',
      icon: '⭐',
      delay: 200
    },
    { 
      number: 25, 
      suffix: '+', 
      label: 'Happy Clients',
      icon: '😊',
      delay: 400
    },
    { 
      number: 3, 
      suffix: '+', 
      label: 'Years Experience',
      icon: '💼',
      delay: 600
    }
  ]

  const theme = {
    card: isDarkMode ? 'bg-black/40' : 'bg-white/70',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    border: isDarkMode ? 'border-white/10' : 'border-gray-200/50'
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-16">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`${theme.card} backdrop-blur-sm rounded-2xl p-6 text-center border ${theme.border} hover:scale-105 transition-all duration-300 group`}
          data-aos="fade-up"
          data-aos-delay={stat.delay}
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
            {stat.icon}
          </div>
          <div className={`text-3xl lg:text-4xl font-bold ${theme.text} mb-2`}>
            <AnimatedCounter 
              end={stat.number}
              suffix={stat.suffix}
              duration={2000}
              startDelay={stat.delay}
              easing="ease-out"
            />
          </div>
          <div className={`text-sm ${theme.textMuted} font-medium`}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnimatedCounter
