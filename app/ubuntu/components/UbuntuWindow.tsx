'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WindowState } from './UbuntuDesktop'

interface UbuntuWindowProps {
  window: WindowState
  isActive: boolean
  children: ReactNode
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onPositionChange: (x: number, y: number) => void
  onSizeChange: (width: number, height: number) => void
}

export default function UbuntuWindow({
  window: win,
  isActive,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: UbuntuWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return
    onFocus()
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - win.x,
      y: e.clientY - win.y,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !win.isMaximized) {
      onPositionChange(e.clientX - dragOffset.x, e.clientY - dragOffset.y)
    }
    if (isResizing && !win.isMaximized) {
      const newWidth = Math.max(400, resizeStart.width + (e.clientX - resizeStart.x))
      const newHeight = Math.max(300, resizeStart.height + (e.clientY - resizeStart.y))
      onSizeChange(newWidth, newHeight)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  // Handle resize
  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFocus()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: win.width,
      height: win.height,
    })
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragOffset, resizeStart])

  if (win.isMinimized) return null

  const windowStyle = win.isMaximized
    ? {
        top: 32,
        left: 64,
        right: 0,
        bottom: 0,
        width: 'calc(100vw - 64px)',
        height: 'calc(100vh - 32px)',
      }
    : {
        top: win.y,
        left: win.x,
        width: win.width,
        height: win.height,
      }

  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed overflow-hidden rounded-xl shadow-2xl flex flex-col ${
          isActive ? 'ring-1 ring-white/20' : ''
        }`}
        style={{
          ...windowStyle,
          zIndex: win.zIndex,
        }}
        onClick={onFocus}
      >
        {/* Title Bar */}
        <div
          className={`h-10 flex items-center px-3 cursor-move select-none ${
            isActive ? 'bg-[#2d2d2d]' : 'bg-[#3d3d3d]'
          }`}
          onMouseDown={handleMouseDown}
          onDoubleClick={onMaximize}
        >
          {/* Window Controls */}
          <div className="window-controls flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] hover:bg-[#ff8a84] transition-colors flex items-center justify-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black/70">✕</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMinimize()
              }}
              className="w-3.5 h-3.5 rounded-full bg-[#febc2e] hover:bg-[#ffd062] transition-colors flex items-center justify-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black/70">−</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMaximize()
              }}
              className="w-3.5 h-3.5 rounded-full bg-[#28c840] hover:bg-[#5ed771] transition-colors flex items-center justify-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black/70">⤢</span>
            </button>
          </div>

          {/* Window Title */}
          <div className="flex-1 text-center text-white/80 text-sm font-medium">
            {win.title}
          </div>

          {/* Spacer for symmetry */}
          <div className="w-16" />
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#1a1a1a] overflow-auto">
          {children}
        </div>

        {/* Resize Handle */}
        {!win.isMaximized && (
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={handleResizeStart}
          >
            <svg
              className="w-3 h-3 text-white/30 absolute bottom-1 right-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM22 14H20V12H22V14ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z" />
            </svg>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
