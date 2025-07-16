import { useState, useEffect } from 'react'

function ParticleSystem() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate particles
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      color: [
        'rgb(var(--color-web-green-400))', 
        'rgb(var(--color-web-green-500))', 
        'rgb(var(--color-info))', 
        'rgb(var(--color-warning))', 
        'rgb(var(--color-success))'
      ][Math.floor(Math.random() * 5)]
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

    return () => clearInterval(particleInterval)
  }, [])

  return (
    <>
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
    </>
  )
}

export default ParticleSystem
