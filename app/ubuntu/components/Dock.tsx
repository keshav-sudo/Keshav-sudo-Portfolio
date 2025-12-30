'use client'

import { motion } from 'framer-motion'
import { AppId, WindowState } from './UbuntuDesktop'

interface DockProps {
  openApp: (appId: AppId) => void
  windows: WindowState[]
  onShowApps: () => void
}

interface DockItem {
  id: AppId
  icon: string
  label: string
}

const dockApps: DockItem[] = [
  { id: 'files', icon: '📁', label: 'Files' },
  { id: 'about', icon: '👤', label: 'About Me' },
  { id: 'projects', icon: '💻', label: 'Projects' },
  { id: 'skills', icon: '⚡', label: 'Skills' },
  { id: 'experience', icon: '💼', label: 'Experience' },
  { id: 'terminal', icon: '🖥️', label: 'Terminal' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
]

const webApps: DockItem[] = [
  { id: 'github', icon: '🐙', label: 'GitHub' },
  { id: 'linkedin', icon: '💼', label: 'LinkedIn' },
  { id: 'youtube', icon: '▶️', label: 'YouTube' },
  { id: 'spotify', icon: '🎵', label: 'Spotify' },
]

export default function Dock({ openApp, windows, onShowApps }: DockProps) {
  const isAppOpen = (appId: AppId) => windows.some((w) => w.appId === appId)

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="fixed left-0 top-10 bottom-0 w-[72px] bg-[#1d1d1d]/90 backdrop-blur-md flex flex-col items-center py-3 gap-0.5 z-[9990] border-r border-white/5"
    >
      {/* Portfolio Apps */}
      {dockApps.map((app, index) => (
        <motion.button
          key={app.id}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.06 }}
          onClick={() => openApp(app.id)}
          className="group relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all duration-200"
        >
          <span className="text-[26px] group-hover:scale-110 transition-transform drop-shadow-lg">
            {app.icon}
          </span>

          {/* Tooltip */}
          <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1d1d1d] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl border border-white/10 z-50">
            {app.label}
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[#1d1d1d] rotate-45 border-l border-b border-white/10" />
          </div>

          {/* Running Indicator */}
          {isAppOpen(app.id) && (
            <motion.div
              layoutId={`indicator-${app.id}`}
              className="absolute left-0 w-1 h-6 bg-[#E95420] rounded-r-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          )}
        </motion.button>
      ))}

      {/* Separator */}
      <div className="w-8 h-px bg-white/20 my-1.5" />

      {/* Web Apps */}
      {webApps.map((app, index) => (
        <motion.button
          key={app.id}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 + index * 0.06 }}
          onClick={() => openApp(app.id)}
          className="group relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all duration-200"
        >
          <span className="text-[26px] group-hover:scale-110 transition-transform drop-shadow-lg">
            {app.icon}
          </span>

          {/* Tooltip */}
          <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1d1d1d] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl border border-white/10 z-50">
            {app.label}
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[#1d1d1d] rotate-45 border-l border-b border-white/10" />
          </div>

          {/* Running Indicator */}
          {isAppOpen(app.id) && (
            <motion.div
              className="absolute left-0 w-1 h-6 bg-[#E95420] rounded-r-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          )}
        </motion.button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Show Applications Grid Button */}
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onShowApps}
        className="group w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors mb-2"
      >
        <div className="grid grid-cols-3 gap-0.5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white/60 rounded-sm group-hover:bg-white transition-colors" />
          ))}
        </div>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1d1d1d] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl border border-white/10 z-50">
          Show Applications
          <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[#1d1d1d] rotate-45 border-l border-b border-white/10" />
        </div>
      </motion.button>
    </motion.div>
  )
}
