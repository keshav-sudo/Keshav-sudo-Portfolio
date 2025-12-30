'use client'

import { useDesktop } from '@/app/context/DesktopContext'
import { Wallpaper } from './Wallpaper'
import { TopBar } from './TopBar'
import { Dock } from './Dock'
import { Window } from './Window'
import { StartMenu } from './StartMenu'
import { useState } from 'react'

export default function Desktop() {
  const { windows, focusWindow } = useDesktop()
  const [showStart, setShowStart] = useState(false)

  const toggleStart = () => setShowStart((prev) => !prev)

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-black">
      <Wallpaper />
      <TopBar />
      <Dock />
      {/* Bottom taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#2C001E] flex items-center px-4">
        <button
          onClick={toggleStart}
          className="flex items-center text-white hover:bg-white/10 px-3 py-1 rounded"
        >
          <span className="material-icons mr-1">menu</span>
          <span>Start</span>
        </button>
      </div>
      {showStart && <StartMenu />}
      {windows.map((win) => (
        <Window key={win.id} state={win} onFocus={() => focusWindow(win.id)} />
      ))}
    </div>
  )
}
