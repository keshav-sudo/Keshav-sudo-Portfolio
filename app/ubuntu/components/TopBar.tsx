'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WindowState } from './UbuntuDesktop'

interface TopBarProps {
  windows: WindowState[]
  restoreWindow: (id: string) => void
}

export default function TopBar({ windows, restoreWindow }: TopBarProps) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [showActivities, setShowActivities] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [volume, setVolume] = useState(75)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const minimizedWindows = windows.filter((w) => w.isMinimized)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-8 bg-[#1d1d1d]/95 backdrop-blur-md flex items-center justify-between px-3 z-[9999] border-b border-white/5">
        {/* Left: Activities */}
        <button
          onClick={() => setShowActivities(!showActivities)}
          className="text-white text-[13px] font-medium hover:bg-white/10 px-3 py-1 rounded transition-colors"
        >
          Activities
        </button>

        {/* Center: Date & Time */}
        <button 
          className="absolute left-1/2 transform -translate-x-1/2 text-white text-[13px] font-medium hover:bg-white/10 px-3 py-1 rounded transition-colors"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          {date} {time}
        </button>

        {/* Right: System Tray */}
        <div className="flex items-center gap-1">
          {/* Minimized Apps */}
          {minimizedWindows.length > 0 && (
            <div className="flex gap-1 mr-2 border-r border-white/10 pr-2">
              {minimizedWindows.map((w) => (
                <button
                  key={w.id}
                  onClick={() => restoreWindow(w.id)}
                  className="text-white/60 text-xs hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {w.title}
                </button>
              ))}
            </div>
          )}

          {/* System Icons */}
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition-colors"
          >
            {/* Network */}
            <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>

            {/* Volume */}
            <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>

            {/* Battery */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
              </svg>
              <span className="text-white/60 text-xs">85%</span>
            </div>

            {/* Power */}
            <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9997]"
              onClick={() => setShowNotifications(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-10 right-4 w-80 bg-[#2d2d2d] rounded-xl shadow-2xl z-[9998] overflow-hidden border border-white/10"
            >
              {/* Quick Settings */}
              <div className="p-4 border-b border-white/10">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { icon: '📶', label: 'Wi-Fi', active: true },
                    { icon: '🔵', label: 'Bluetooth', active: false },
                    { icon: '🌙', label: 'Night Mode', active: false },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-colors ${
                        item.active ? 'bg-[#E95420]' : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-white/80 text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-white/60">🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                  <span className="text-white/60 text-sm w-8">{volume}%</span>
                </div>
              </div>

              {/* Notifications */}
              <div className="p-4">
                <h3 className="text-white/50 text-xs uppercase mb-3">Notifications</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span>💼</span>
                      <span className="text-white/80 text-sm">Welcome to my portfolio!</span>
                    </div>
                    <p className="text-white/50 text-xs mt-1">Just now</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span>✨</span>
                      <span className="text-white/80 text-sm">Click on apps in the dock</span>
                    </div>
                    <p className="text-white/50 text-xs mt-1">Explore my work</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 bg-white/5 border-t border-white/10 flex justify-between">
                <button className="text-white/60 text-sm hover:text-white">⚙️ Settings</button>
                <button className="text-white/60 text-sm hover:text-white">🔒 Lock</button>
                <button className="text-white/60 text-sm hover:text-white">⏻ Power</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Activities Overlay */}
      <AnimatePresence>
        {showActivities && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9998] pt-12 px-8"
            onClick={() => setShowActivities(false)}
          >
            <div className="text-center text-white/50 mt-20">
              <input
                type="text"
                placeholder="Type to search applications..."
                className="w-96 px-6 py-3 bg-white/10 rounded-full text-white placeholder-white/40 outline-none border border-white/20 focus:border-[#E95420] transition-colors"
                onClick={(e) => e.stopPropagation()}
              />
              
              {windows.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-white/40 text-sm mb-6">Open Windows</h3>
                  <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {windows.map((w) => (
                      <motion.button
                        key={w.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors border border-white/10"
                        onClick={(e) => {
                          e.stopPropagation()
                          restoreWindow(w.id)
                          setShowActivities(false)
                        }}
                      >
                        <div className="text-3xl mb-2">🪟</div>
                        <div className="text-white text-sm">{w.title}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
