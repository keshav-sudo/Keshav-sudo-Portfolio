'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    // TypeScript needs to know canvas is not null in the class scope
    const canvasElement = canvas

    class FlowLine {
      x: number
      y: number
      targetX: number
      targetY: number
      speed: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvasElement.width
        this.y = Math.random() * canvasElement.height
        this.targetX = Math.random() * canvasElement.width
        this.targetY = Math.random() * canvasElement.height
        this.speed = 0.1 + Math.random() * 0.2
        this.opacity = 0.02 + Math.random() * 0.03
      }

      update() {
        const dx = this.targetX - this.x
        const dy = this.targetY - this.y
        
        this.x += dx * this.speed * 0.01
        this.y += dy * this.speed * 0.01

        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
          this.targetX = Math.random() * canvasElement.width
          this.targetY = Math.random() * canvasElement.height
        }
      }

      draw() {
        if (!ctx) return
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.targetX, this.targetY)
        ctx.stroke()
      }
    }

    const lines: FlowLine[] = []
    for (let i = 0; i < 8; i++) {
      lines.push(new FlowLine())
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      lines.forEach(line => {
        line.update()
        line.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('resize', setSize)

    return () => {
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#0A0A0A' }}
    />
  )
}
