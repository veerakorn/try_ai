import { useState, useEffect } from 'react'

function TypewriterEffect({ text, delay = 200, className = '' }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-ping">|</span>}
    </span>
  )
}

export default TypewriterEffect
