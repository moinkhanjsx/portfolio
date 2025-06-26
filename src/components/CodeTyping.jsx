import { useState, useEffect } from 'react'

const CodeTyping = ({ 
  code, 
  speed = 80,
  className = "",
  showLineNumbers = true,
  language = "javascript" 
}) => {
  const [displayCode, setDisplayCode] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentLine, setCurrentLine] = useState(1)

  useEffect(() => {
    if (currentIndex >= code.length) return

    const timeout = setTimeout(() => {
      const nextChar = code[currentIndex]
      setDisplayCode(prev => prev + nextChar)
      
      if (nextChar === '\n') {
        setCurrentLine(prev => prev + 1)
      }
      
      setCurrentIndex(prev => prev + 1)
    }, speed)

    return () => clearTimeout(timeout)
  }, [currentIndex, code, speed])

  const lines = displayCode.split('\n')

  return (
    <div className={`bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-hidden ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 text-xs ml-2">{language}</span>
      </div>
      
      {/* Code Content */}
      <div className="relative">
        {lines.map((line, index) => (
          <div key={index} className="flex">
            {showLineNumbers && (
              <span className="text-gray-500 text-xs mr-4 select-none min-w-[2rem] text-right">
                {index + 1}
              </span>
            )}
            <span className="text-green-400 flex-1">
              {line}
              {index === lines.length - 1 && currentIndex < code.length && (
                <span className="animate-pulse text-white">|</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const TerminalTyping = ({ 
  commands, 
  speed = 100,
  pauseBetweenCommands = 1500,
  className = "" 
}) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    if (currentCommandIndex >= commands.length) return

    const currentCommand = commands[currentCommandIndex]
    
    if (!showOutput && currentCharIndex < currentCommand.command.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + currentCommand.command[currentCharIndex])
        setCurrentCharIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!showOutput && currentCharIndex >= currentCommand.command.length) {
      const timeout = setTimeout(() => {
        setShowOutput(true)
      }, 500)

      return () => clearTimeout(timeout)
    } else if (showOutput) {
      const timeout = setTimeout(() => {
        setCurrentCommandIndex(prev => prev + 1)
        setCurrentText('')
        setCurrentCharIndex(0)
        setShowOutput(false)
      }, pauseBetweenCommands)

      return () => clearTimeout(timeout)
    }
  }, [currentCommandIndex, currentCharIndex, showOutput, commands, speed, pauseBetweenCommands])

  const currentCommand = commands[currentCommandIndex] || {}

  return (
    <div className={`bg-black rounded-lg p-4 font-mono text-sm ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 text-xs ml-2">terminal</span>
      </div>

      {/* Previous Commands */}
      {commands.slice(0, currentCommandIndex).map((cmd, index) => (
        <div key={index} className="mb-2">
          <div className="flex">
            <span className="text-green-400">$ </span>
            <span className="text-white">{cmd.command}</span>
          </div>
          {cmd.output && (
            <div className="text-gray-300 ml-2 mt-1 whitespace-pre-line">
              {cmd.output}
            </div>
          )}
        </div>
      ))}

      {/* Current Command */}
      {currentCommandIndex < commands.length && (
        <div className="mb-2">
          <div className="flex">
            <span className="text-green-400">$ </span>
            <span className="text-white">
              {currentText}
              {!showOutput && (
                <span className="animate-pulse text-cyan-400">|</span>
              )}
            </span>
          </div>
          {showOutput && currentCommand.output && (
            <div className="text-gray-300 ml-2 mt-1 whitespace-pre-line animate-fadeInUp">
              {currentCommand.output}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { CodeTyping, TerminalTyping }
export default CodeTyping
