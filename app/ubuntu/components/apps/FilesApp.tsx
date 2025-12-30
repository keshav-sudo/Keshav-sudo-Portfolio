'use client'

import { motion } from 'framer-motion'
import { AppId } from '../UbuntuDesktop'

interface FilesAppProps {
  openApp: (appId: AppId) => void
}

interface FileItem {
  name: string
  icon: string
  type: 'folder' | 'file' | 'app'
  appId?: AppId
}

const files: FileItem[] = [
  { name: 'About Me', icon: '👤', type: 'app', appId: 'about' },
  { name: 'Projects', icon: '💻', type: 'app', appId: 'projects' },
  { name: 'Skills', icon: '⚡', type: 'app', appId: 'skills' },
  { name: 'Experience', icon: '💼', type: 'app', appId: 'experience' },
  { name: 'Terminal', icon: '🖥️', type: 'app', appId: 'terminal' },
  { name: 'Resume.pdf', icon: '📄', type: 'file' },
  { name: 'Downloads', icon: '📥', type: 'folder' },
  { name: 'Documents', icon: '📁', type: 'folder' },
]

export default function FilesApp({ openApp }: FilesAppProps) {
  const handleDoubleClick = (item: FileItem) => {
    if (item.type === 'app' && item.appId) {
      openApp(item.appId)
    }
  }

  return (
    <div className="flex h-full bg-[#1a1a1a]">
      {/* Sidebar */}
      <div className="w-48 bg-[#252525] border-r border-white/10 p-4">
        <h3 className="text-white/50 text-xs uppercase tracking-wider mb-3">Places</h3>
        <div className="space-y-1">
          {[
            { icon: '🏠', name: 'Home' },
            { icon: '📁', name: 'Documents' },
            { icon: '📥', name: 'Downloads' },
            { icon: '🖼️', name: 'Pictures' },
            { icon: '🎵', name: 'Music' },
            { icon: '🎬', name: 'Videos' },
            { icon: '🗑️', name: 'Trash' },
          ].map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors text-sm"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-white/60 text-sm">
          <span className="hover:text-white cursor-pointer">🏠 Home</span>
          <span>/</span>
          <span className="text-white">Portfolio</span>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-4 gap-4">
          {files.map((file, index) => (
            <motion.button
              key={file.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onDoubleClick={() => handleDoubleClick(file)}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="text-5xl group-hover:scale-110 transition-transform">
                {file.icon}
              </div>
              <span className="text-white/80 text-sm text-center break-all">
                {file.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-0 left-48 right-0 h-8 bg-[#252525] border-t border-white/10 flex items-center px-4">
          <span className="text-white/50 text-xs">{files.length} items</span>
        </div>
      </div>
    </div>
  )
}
