"use client"

import { useEffect, useRef } from "react"

type Season = "spring" | "summer" | "fall" | "winter"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function SeasonParticles({ season }: { season: Season }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: season === "winter" ? Math.random() * 0.5 + 0.2 : (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.07 + 0.08,
      })
    }

    const getColor = () => {
      switch (season) {
        case "summer":
          return "255, 165, 0" // Orange
        case "winter":
          return "173, 216, 230" // Light Blue
        case "fall":
          return "255, 140, 0" // Dark Orange / Amber
        case "spring":
          return "50, 205, 50" // Lime Green
        default:
          return "255, 255, 255"
      }
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${getColor()}, ${particle.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [season])

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-10" style={{ mixBlendMode: "screen" }} />
  )
}
