import { useState, useEffect } from 'react'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [particles, setParticles] = useState([])
  const [helloIndex, setHelloIndex] = useState(0)
  const [worldIndex, setWorldIndex] = useState(0)

  const helloText = "Hello"
  const worldText = "World"

  // เริ่มแสดง animation หลังจาก component mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Generate particles
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      color: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][Math.floor(Math.random() * 5)]
    }))
    setParticles(particleArray)

    // Animate particles
    const particleInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.speedX
        let newY = particle.y + particle.speedY
        
        // Wrap around screen edges
        if (newX > window.innerWidth) newX = 0
        if (newX < 0) newX = window.innerWidth
        if (newY > window.innerHeight) newY = 0
        if (newY < 0) newY = window.innerHeight
        
        return {
          ...particle,
          x: newX,
          y: newY
        }
      }))
    }, 50)

    // Typewriter effect
    const helloInterval = setInterval(() => {
      setHelloIndex(prev => prev < helloText.length ? prev + 1 : prev)
    }, 200)

    setTimeout(() => {
      const worldInterval = setInterval(() => {
        setWorldIndex(prev => prev < worldText.length ? prev + 1 : prev)
      }, 150)
      return () => clearInterval(worldInterval)
    }, 1500)

    return () => {
      clearInterval(timeInterval)
      clearInterval(particleInterval)
      clearInterval(helloInterval)
    }
  }, [])

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const createRipple = (e) => {
    const ripple = document.createElement('div')
    ripple.className = 'ripple'
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      left: ${e.clientX - 25}px;
      top: ${e.clientY - 25}px;
      width: 50px;
      height: 50px;
      z-index: 1000;
    `
    document.body.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden relative cursor-none"
      onClick={createRipple}
    >
      {/* Custom cursor */}
      <div 
        className="fixed w-6 h-6 bg-white/30 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{ 
          left: mousePos.x - 12, 
          top: mousePos.y - 12,
          transform: `scale(${Math.sin(Date.now() * 0.005) * 0.3 + 1})` 
        }}
      />

      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-70 animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 border-2 border-white/20 rotate-45 animate-spin"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-24 bg-gradient-to-b from-pink-400 to-transparent rounded-full animate-pulse"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        
        {/* Digital clock */}
        <div className="absolute top-8 right-8 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 text-white font-mono text-sm border border-white/10">
          {currentTime.toLocaleTimeString('th-TH')}
        </div>

        {/* Main title with typewriter effect */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Hello text with glow effect */}
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold mb-4 relative">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-2xl"
              style={{ 
                textShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)',
                filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))'
              }}>
              {helloText.slice(0, helloIndex)}
              <span className="animate-ping">|</span>
            </span>
          </h1>

          {/* World text with different animation */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 relative">
            <span className="bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent"
              style={{ 
                textShadow: '0 0 30px rgba(236, 72, 153, 0.5)',
                filter: 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.6))'
              }}>
              {worldText.slice(0, worldIndex)}
              {worldIndex < worldText.length && <span className="animate-pulse">|</span>}
            </span>
          </h2>

          {/* Subtitle with wave animation */}
          <div className="mb-12 overflow-hidden">
            <p className="text-xl md:text-2xl text-white/90 font-light animate-bounce">
              {"✨ ยินดีต้อนรับสู่โลกแห่งเทคโนโลยี ✨".split('').map((char, i) => (
                <span 
                  key={i} 
                  className="inline-block animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          </div>

          {/* Interactive floating cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              { icon: "🚀", title: "React 19", desc: "Modern UI Library", color: "from-blue-500 to-cyan-500" },
              { icon: "⚡", title: "Vite 7", desc: "Lightning Fast", color: "from-purple-500 to-pink-500" },
              { icon: "🎨", title: "Tailwind", desc: "Beautiful Styling", color: "from-green-500 to-blue-500" }
            ].map((card, i) => (
              <div 
                key={i} 
                className={`group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer transform hover:shadow-2xl hover:shadow-${card.color.split('-')[1]}-500/25`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="text-4xl mb-3 animate-bounce">{card.icon}</div>
                <h3 className={`text-xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent mb-2`}>
                  {card.title}
                </h3>
                <p className="text-white/70 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive buttons */}
          <div className="space-y-4 mb-12">
            <button 
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95 overflow-hidden"
              onClick={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)'
                setTimeout(() => e.currentTarget.style.transform = 'scale(1.1)', 100)
                setTimeout(() => e.currentTarget.style.transform = 'scale(1)', 200)
              }}
            >
              <span className="relative z-10">🎉 เริ่มการผจญภัย</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <div className="flex justify-center space-x-4">
              <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                📖 เรียนรู้เพิ่มเติม
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                💼 Portfolio
              </button>
            </div>
          </div>

          {/* Animated social icons */}
          <div className="flex justify-center space-x-6">
            {['🌟', '💎', '🔥', '⭐', '✨'].map((emoji, i) => (
              <div 
                key={i}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-xl hover:scale-125 transition-all duration-300 cursor-pointer hover:bg-white/20 animate-pulse border border-white/20"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-ping"></div>
          </div>
        </div>

      </div>

      {/* CSS for ripple animation */}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default App
