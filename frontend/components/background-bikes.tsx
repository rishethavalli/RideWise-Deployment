"use client"

import { useEffect, useRef } from "react"

type Bike = {
  x: number
  y: number
  speed: number
  opacity: number
  scale: number
}

export function BackgroundBikes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const bikes: Bike[] = []
    const bikeCount = 5

    for (let i = 0; i < bikeCount; i++) {
      bikes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.02 + 0.015,
        scale: Math.random() * 0.5 + 0.5,
      })
    }

    const drawBike = (bike: Bike) => {
      ctx.save()
      ctx.translate(bike.x, bike.y)
      ctx.scale(bike.scale, bike.scale)
      ctx.globalAlpha = bike.opacity

      const bikeColor = `rgba(60, 242, 255, ${bike.opacity * 0.8})`
      ctx.strokeStyle = bikeColor
      ctx.lineWidth = 2

      // Back wheel
      ctx.beginPath()
      ctx.arc(0, 0, 12, 0, Math.PI * 2)
      ctx.stroke()

      // Front wheel
      ctx.beginPath()
      ctx.arc(40, 0, 12, 0, Math.PI * 2)
      ctx.stroke()

      // Frame
      ctx.beginPath()
      ctx.moveTo(12, 0)
      ctx.lineTo(20, -15)
      ctx.lineTo(28, 0)
      ctx.moveTo(20, -15)
      ctx.lineTo(20, -20)
      ctx.stroke()

      ctx.restore()
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bikes.forEach((bike) => {
        bike.x += bike.speed

        if (bike.x > canvas.width + 50) {
          bike.x = -50
          bike.y = Math.random() * canvas.height
        }

        drawBike(bike)
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
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />
}
