'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TopBar from './TopBar'
import Dock from './Dock'
import UbuntuWindow from './UbuntuWindow'
import AboutApp from './apps/AboutApp'
import ProjectsApp from './apps/ProjectsApp'
import SkillsApp from './apps/SkillsApp'
import ExperienceApp from './apps/ExperienceApp'
import TerminalApp from './apps/TerminalApp'
import FilesApp from './apps/FilesApp'
import SettingsApp from './apps/SettingsApp'
import BrowserApp from './apps/BrowserApp'

export type AppId = 'about' | 'projects' | 'skills' | 'experience' | 'terminal' | 'files' | 'settings' | 'github' | 'linkedin' | 'youtube' | 'spotify' | 'resume'

export interface WindowState {
  id: string
  appId: AppId
  title: string
  x: number
  y: number
  width: number
  height: number
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

const appConfig: Record<AppId, { title: string; icon: string; defaultWidth: number; defaultHeight: number; url?: string; openExternal?: boolean }> = {
  about: { title: 'About Me', icon: '👤', defaultWidth: 700, defaultHeight: 500 },
  projects: { title: 'Projects', icon: '📁', defaultWidth: 900, defaultHeight: 600 },
  skills: { title: 'Skills', icon: '⚡', defaultWidth: 700, defaultHeight: 500 },
  experience: { title: 'Experience', icon: '💼', defaultWidth: 800, defaultHeight: 550 },
  terminal: { title: 'Terminal', icon: '🖥️', defaultWidth: 750, defaultHeight: 480 },
  files: { title: 'Files', icon: '📂', defaultWidth: 800, defaultHeight: 500 },
  settings: { title: 'Settings', icon: '⚙️', defaultWidth: 850, defaultHeight: 550 },
  github: { title: 'GitHub - keshav-sudo', icon: '🐙', defaultWidth: 950, defaultHeight: 650, url: 'https://github.com/keshav-sudo' },
  linkedin: { title: 'LinkedIn', icon: '💼', defaultWidth: 950, defaultHeight: 650, url: 'https://linkedin.com/in/keshav-sharmax' },
  youtube: { title: 'YouTube', icon: '▶️', defaultWidth: 950, defaultHeight: 650, url: 'https://youtube.com' },
  spotify: { title: 'Spotify', icon: '🎵', defaultWidth: 950, defaultHeight: 650, url: 'https://open.spotify.com' },
  resume: { title: 'Resume.pdf', icon: '📄', defaultWidth: 800, defaultHeight: 600, url: '/resume.pdf', openExternal: true },
}

export default function UbuntuDesktop() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [highestZIndex, setHighestZIndex] = useState(100)
  const [isInitialized, setIsInitialized] = useState(false)
  const [showAppsMenu, setShowAppsMenu] = useState(false)

  // Open default windows on first load
  useEffect(() => {
    if (!isInitialized) {
      const welcomeWindow: WindowState = {
        id: 'about-welcome',
        appId: 'about',
        title: 'About Me',
        x: 150,
        y: 80,
        width: 700,
        height: 500,
        isMinimized: false,
        isMaximized: false,
        zIndex: 101,
      }
      setWindows([welcomeWindow])
      setActiveWindowId(welcomeWindow.id)
      setIsInitialized(true)
    }
  }, [isInitialized])

  const openApp = useCallback((appId: AppId) => {
    setShowAppsMenu(false)
    
    const config = appConfig[appId]
    
    // Open external links in new tab (like resume.pdf)
    if (config.openExternal && config.url) {
      window.open(config.url, '_blank')
      return
    }
    
    // Check if app is already open
    const existingWindow = windows.find((w) => w.appId === appId && !w.isMinimized)
    if (existingWindow) {
      focusWindow(existingWindow.id)
      return
    }

    // Check if minimized, then restore
    const minimizedWindow = windows.find((w) => w.appId === appId && w.isMinimized)
    if (minimizedWindow) {
      restoreWindow(minimizedWindow.id)
      return
    }

    const offset = windows.length * 25
    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: config.title,
      x: 120 + offset,
      y: 60 + offset,
      width: config.defaultWidth,
      height: config.defaultHeight,
      isMinimized: false,
      isMaximized: false,
      zIndex: highestZIndex + 1,
    }

    setHighestZIndex((prev) => prev + 1)
    setWindows((prev) => [...prev, newWindow])
    setActiveWindowId(newWindow.id)
  }, [windows, highestZIndex])

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId))
    if (activeWindowId === windowId) {
      setActiveWindowId(null)
    }
  }, [activeWindowId])

  const focusWindow = useCallback((windowId: string) => {
    setHighestZIndex((prev) => prev + 1)
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, zIndex: highestZIndex + 1 } : w
      )
    )
    setActiveWindowId(windowId)
  }, [highestZIndex])

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      )
    )
    if (activeWindowId === windowId) {
      setActiveWindowId(null)
    }
  }, [activeWindowId])

  const restoreWindow = useCallback((windowId: string) => {
    setHighestZIndex((prev) => prev + 1)
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w
      )
    )
    setActiveWindowId(windowId)
  }, [highestZIndex])

  const toggleMaximize = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      )
    )
  }, [])

  const updateWindowPosition = useCallback((windowId: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, x, y } : w
      )
    )
  }, [])

  const updateWindowSize = useCallback((windowId: string, width: number, height: number) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, width, height } : w
      )
    )
  }, [])

  const renderAppContent = (appId: AppId) => {
    const config = appConfig[appId]
    
    switch (appId) {
      case 'about':
        return <AboutApp />
      case 'projects':
        return <ProjectsApp />
      case 'skills':
        return <SkillsApp />
      case 'experience':
        return <ExperienceApp />
      case 'terminal':
        return <TerminalApp />
      case 'files':
        return <FilesApp openApp={openApp} />
      case 'settings':
        return <SettingsApp />
      case 'github':
      case 'linkedin':
      case 'youtube':
      case 'spotify':
        return <BrowserApp url={config.url || ''} title={config.title} />
      default:
        return <div>App not found</div>
    }
  }

  // All available apps for the menu
  const allApps = [
    { id: 'about' as AppId, icon: '👤', name: 'About Me', category: 'Portfolio' },
    { id: 'projects' as AppId, icon: '💻', name: 'Projects', category: 'Portfolio' },
    { id: 'skills' as AppId, icon: '⚡', name: 'Skills', category: 'Portfolio' },
    { id: 'experience' as AppId, icon: '💼', name: 'Experience', category: 'Portfolio' },
    { id: 'terminal' as AppId, icon: '🖥️', name: 'Terminal', category: 'System' },
    { id: 'files' as AppId, icon: '📁', name: 'Files', category: 'System' },
    { id: 'settings' as AppId, icon: '⚙️', name: 'Settings', category: 'System' },
    { id: 'github' as AppId, icon: '🐙', name: 'GitHub', category: 'Web' },
    { id: 'linkedin' as AppId, icon: '💼', name: 'LinkedIn', category: 'Web' },
    { id: 'youtube' as AppId, icon: '▶️', name: 'YouTube', category: 'Web' },
    { id: 'spotify' as AppId, icon: '🎵', name: 'Spotify', category: 'Web' },
    { id: 'resume' as AppId, icon: '📄', name: 'Resume', category: 'Portfolio' },
  ]

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a0a14 0%, #2c001e 20%, #5e2750 50%, #dd4814 85%, #ef7d4a 100%)',
        backgroundSize: 'cover',
      }}
    >
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(233, 84, 32, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(119, 41, 83, 0.4) 0%, transparent 50%)`,
        }}
      />

      {/* Top Bar */}
      <TopBar windows={windows} restoreWindow={restoreWindow} />

      {/* Dock */}
      <Dock openApp={openApp} windows={windows} onShowApps={() => setShowAppsMenu(true)} />

      {/* Windows */}
      {windows.map((window) => (
        <UbuntuWindow
          key={window.id}
          window={window}
          isActive={activeWindowId === window.id}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => toggleMaximize(window.id)}
          onFocus={() => focusWindow(window.id)}
          onPositionChange={(x, y) => updateWindowPosition(window.id, x, y)}
          onSizeChange={(w, h) => updateWindowSize(window.id, w, h)}
        >
          {renderAppContent(window.appId)}
        </UbuntuWindow>
      ))}

      {/* Desktop Icons */}
      <div className="absolute top-14 right-6 flex flex-col gap-2">
        <DesktopIcon icon="🐙" label="GitHub" onClick={() => openApp('github')} />
        <DesktopIcon icon="💼" label="LinkedIn" onClick={() => openApp('linkedin')} />
        <DesktopIcon icon="📄" label="Resume" onClick={() => openApp('resume')} />
        <DesktopIcon icon="⚙️" label="Settings" onClick={() => openApp('settings')} />
        <DesktopIcon icon="🗑️" label="Trash" onClick={() => {}} />
      </div>

      {/* Applications Menu Overlay */}
      <AnimatePresence>
        {showAppsMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9995] pt-12"
            onClick={() => setShowAppsMenu(false)}
          >
            <div className="max-w-4xl mx-auto px-8 pt-8">
              {/* Search Bar */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8"
              >
                <input
                  type="text"
                  placeholder="Type to search..."
                  className="w-full px-6 py-4 bg-white/10 rounded-2xl text-white text-lg placeholder-white/40 outline-none border border-white/10 focus:border-[#E95420] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </motion.div>

              {/* Apps Grid */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-white/40 text-sm uppercase tracking-wider mb-4">All Applications</h3>
                <div className="grid grid-cols-6 gap-4">
                  {allApps.map((app, index) => (
                    <motion.button
                      key={app.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      onClick={(e) => {
                        e.stopPropagation()
                        openApp(app.id)
                      }}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <span className="text-5xl group-hover:scale-110 transition-transform">
                        {app.icon}
                      </span>
                      <span className="text-white text-sm text-center">{app.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Running Apps */}
              {windows.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-10"
                >
                  <h3 className="text-white/40 text-sm uppercase tracking-wider mb-4">Running</h3>
                  <div className="flex gap-4 flex-wrap">
                    {windows.map((w) => (
                      <button
                        key={w.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          restoreWindow(w.id)
                          setShowAppsMenu(false)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <span>{appConfig[w.appId].icon}</span>
                        <span className="text-white text-sm">{w.title}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DesktopIcon({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/10 transition-colors group w-20"
    >
      <span className="text-4xl group-hover:scale-110 transition-transform drop-shadow-lg">{icon}</span>
      <span className="text-white text-xs font-medium drop-shadow-lg text-center leading-tight">{label}</span>
    </button>
  )
}
