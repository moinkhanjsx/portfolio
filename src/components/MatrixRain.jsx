import { useEffect, useRef } from 'react'

const MatrixRain = ({ intensity = 0.3, speed = 50, opacity = 0.1 }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix characters (mix of code symbols and Japanese katakana)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|~`+=アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン'
    const charArray = chars.split('')

    const columns = Math.floor(canvas.width / 14)
    const drops = Array(columns).fill(0)

    // Colors for different intensity
    const colors = [
      'rgba(0, 255, 0, 0.8)',
      'rgba(0, 200, 0, 0.6)', 
      'rgba(0, 150, 0, 0.4)',
      'rgba(0, 100, 0, 0.2)'
    ]

    const draw = () => {
      // Semi-transparent background for fade effect
      ctx.fillStyle = `rgba(0, 0, 0, ${0.05 + (1 - intensity) * 0.15})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '14px monospace'

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        
        // Color based on position (brighter at top)
        const colorIndex = Math.min(Math.floor(drops[i] / 50), colors.length - 1)
        ctx.fillStyle = colors[colorIndex]
        
        // Draw character
        ctx.fillText(char, i * 14, drops[i])
        
        // Move drop down
        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        } else {
          drops[i] += 14
        }
      }
    }

    const animate = () => {
      draw()
      animationRef.current = setTimeout(animate, speed)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [intensity, speed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        opacity: Math.min(opacity, 0.15),
        zIndex: -10
      }}
    />
  )
}

export default MatrixRain
