import { useState, useEffect } from 'react'
import { InteractiveTyping } from './AdvancedTypingEffects'

const EnhancedContactForm = ({ isDarkMode = true }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const placeholders = [
    "What's your name?",
    "How can I reach you?", 
    "Tell me about your project..."
  ]

  const theme = {
    card: isDarkMode ? 'bg-black/40' : 'bg-white/70',
    input: isDarkMode ? 'bg-white/5 border-white/20 text-white' : 'bg-gray-50 border-gray-200 text-gray-900',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    border: isDarkMode ? 'border-white/10' : 'border-gray-200/50',
    button: isDarkMode ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700' : 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission with typing effect
    setSubmitMessage('')
    
    const messages = [
      'Sending your message',
      'Sending your message.',
      'Sending your message..',
      'Sending your message...',
      'Message sent successfully! 🚀'
    ]
    
    for (let i = 0; i < messages.length; i++) {
      setTimeout(() => {
        setSubmitMessage(messages[i])
        if (i === messages.length - 1) {
          setTimeout(() => {
            setIsSubmitting(false)
            setSubmitMessage('')
            setFormState({ name: '', email: '', message: '' })
          }, 2000)
        }
      }, i * 500)
    }
  }

  const handleInputChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className={`${theme.card} backdrop-blur-sm rounded-3xl p-8 border ${theme.border} max-w-2xl mx-auto`}>
      <div className="text-center mb-8">
        <h3 className={`text-2xl lg:text-3xl font-bold ${theme.text} mb-4`}>
          Let's Create Something Amazing
        </h3>
        <p className={`${theme.textMuted}`}>
          Ready to bring your ideas to life? Let's start the conversation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium ${theme.text} mb-2`}>
              Name
            </label>
            <InteractiveTyping
              placeholder="What should I call you?"
              onType={(value) => handleInputChange('name', value)}
              className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.text} mb-2`}>
              Email
            </label>
            <InteractiveTyping
              placeholder="your.email@example.com"
              onType={(value) => handleInputChange('email', value)}
              className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.text} mb-2`}>
              Project Details
            </label>
            <textarea
              value={formState.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
              rows={5}
              className={`w-full px-4 py-3 rounded-xl border ${theme.input} focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none`}
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${theme.button} text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>Send Message</span>
                <span>🚀</span>
              </span>
            )}
          </button>
          
          {submitMessage && (
            <div className={`mt-4 text-center ${theme.text} font-medium`}>
              {submitMessage}
            </div>
          )}
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className={`text-sm ${theme.textMuted}`}>
          Response time: Usually within 24 hours ⚡
        </p>
      </div>
    </div>
  )
}

export default EnhancedContactForm
