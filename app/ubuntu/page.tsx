'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UbuntuBoot from './components/UbuntuBoot'
import UbuntuDesktop from './components/UbuntuDesktop'

export default function UbuntuPortfolio() {
  const [isBooting, setIsBooting] = useState(true)
  const [showDesktop, setShowDesktop] = useState(false)

  useEffect(() => {
    // Simulate boot sequence
    const bootTimer = setTimeout(() => {
      setIsBooting(false)
      setTimeout(() => setShowDesktop(true), 500)
    }, 3000)

    return () => clearTimeout(bootTimer)
  }, [])

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {isBooting && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UbuntuBoot />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDesktop && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <UbuntuDesktop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
