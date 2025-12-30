'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function UbuntuBoot() {
  const [stage, setStage] = useState<'bios' | 'logo' | 'loading'>('bios')
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    // Stage 1: BIOS-like black screen
    const biosTimer = setTimeout(() => setStage('logo'), 800)
    
    // Stage 2: Show Ubuntu logo
    const logoTimer = setTimeout(() => setStage('loading'), 1500)

    return () => {
      clearTimeout(biosTimer)
      clearTimeout(logoTimer)
    }
  }, [])

  useEffect(() => {
    if (stage === 'loading') {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + Math.random() * 20
        })
      }, 150)

      const dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
      }, 400)

      return () => {
        clearInterval(progressInterval)
        clearInterval(dotsInterval)
      }
    }
  }, [stage])

  // BIOS Screen
  if (stage === 'bios') {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-start justify-start p-8 font-mono text-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/80"
        >
          <p>BIOS Version 2.0.24</p>
          <p className="mt-2">Initializing system...</p>
          <p className="text-green-400 mt-1">CPU: Portfolio Core @ 3.0GHz</p>
          <p className="text-green-400">RAM: 16GB DDR5</p>
          <p className="text-green-400">Storage: SSD 512GB</p>
          <motion.p
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="mt-4 text-yellow-400"
          >
            Press DEL to enter SETUP
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      {/* Ubuntu Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8"
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          className="text-white"
        >
          {/* Ubuntu Circle of Friends Logo */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#E95420" strokeWidth="4" />
          {/* Three circles (friends) */}
          <circle cx="50" cy="12" r="10" fill="#E95420" />
          <circle cx="17" cy="72" r="10" fill="#E95420" />
          <circle cx="83" cy="72" r="10" fill="#E95420" />
          {/* White inner circles */}
          <circle cx="50" cy="12" r="5" fill="white" />
          <circle cx="17" cy="72" r="5" fill="white" />
          <circle cx="83" cy="72" r="5" fill="white" />
          {/* Connecting arcs */}
          <path
            d="M 40 18 Q 22 35 22 58"
            fill="none"
            stroke="#E95420"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 60 18 Q 78 35 78 58"
            fill="none"
            stroke="#E95420"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 26 78 Q 50 92 74 78"
            fill="none"
            stroke="#E95420"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Ubuntu Text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-white text-4xl font-light tracking-[0.3em] mb-2"
        style={{ fontFamily: 'Ubuntu, sans-serif' }}
      >
        ubuntu
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[#E95420] text-sm tracking-wider mb-12"
      >
        Keshav&apos;s Portfolio
      </motion.p>

      {stage === 'loading' && (
        <>
          {/* Loading Animation - Ubuntu style dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 mb-6"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#E95420' }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/50 text-sm"
          >
            Starting Portfolio OS{dots}
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 250 }}
            className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full rounded-full"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(90deg, #E95420, #772953)'
              }}
            />
          </motion.div>
        </>
      )}
    </div>
  )
}
