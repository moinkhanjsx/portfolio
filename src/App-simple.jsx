import { useState } from 'react'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-8`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          UNIVERSE'S BEST
        </h1>
        
        <h2 className="text-3xl text-center mb-8">
          Full-Stack Developer
        </h2>
        
        <p className="text-xl text-center mb-8">
          Welcome to my portfolio! This is a test to make sure everything is visible.
        </p>
        
        <div className="text-center">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Toggle Theme
          </button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-600 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-2">Skills</h3>
            <p>React, JavaScript, TypeScript</p>
          </div>
          
          <div className="bg-cyan-600 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-2">Projects</h3>
            <p>50+ Completed</p>
          </div>
          
          <div className="bg-pink-600 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-2">Contact</h3>
            <p>kmoin6231@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
