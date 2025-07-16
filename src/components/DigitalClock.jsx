import { useState, useEffect } from 'react'

function DigitalClock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [])

  return (
    <div className="absolute top-8 right-8 bg-neutral-800/50 backdrop-blur-sm rounded-lg px-4 py-2 text-web-green-100 font-mono text-sm border border-web-green-500/20 shadow-lg">
      {currentTime.toLocaleTimeString('th-TH')}
    </div>
  )
}

export default DigitalClock
