'use client'

import { motion } from 'framer-motion'
import { format } from 'date-fns'

export const TopBar = () => {
  const now = new Date()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-8 bg-[#2C001E] flex items-center px-4 text-xs text-white/80"
      initial={{ y: -30 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div className="flex-1">{format(now, 'HH:mm')}</div>
      <div className="flex gap-2">
        <span className="material-icons text-sm">network_wifi</span>
        <span className="material-icons text-sm">battery_full</span>
        <span className="material-icons text-sm">volume_up</span>
      </div>
    </motion.div>
  )
}
