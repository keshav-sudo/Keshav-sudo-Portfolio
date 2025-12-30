'use client'

import { motion } from 'framer-motion'

interface BrowserAppProps {
  url: string
  title: string
}

// Site info for display
const siteInfo: Record<string, { icon: string; color: string; description: string }> = {
  'github.com': {
    icon: '🐙',
    color: '#24292e',
    description: 'View my open source projects and contributions',
  },
  'linkedin.com': {
    icon: '💼',
    color: '#0077b5',
    description: 'Connect with me professionally',
  },
  'youtube.com': {
    icon: '▶️',
    color: '#ff0000',
    description: 'Watch videos and tutorials',
  },
  'spotify.com': {
    icon: '🎵',
    color: '#1db954',
    description: 'Listen to my favorite music',
  },
}

function getSiteKey(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace('www.', '').replace('open.', '')
    return Object.keys(siteInfo).find((key) => hostname.includes(key)) || 'default'
  } catch {
    return 'default'
  }
}

export default function BrowserApp({ url, title }: BrowserAppProps) {
  const siteKey = getSiteKey(url)
  const info = siteInfo[siteKey] || { icon: '🌐', color: '#E95420', description: 'Open this website' }

  const handleOpen = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#1a1a1a] to-[#242424]">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-white/10">
        {/* Navigation Buttons */}
        <div className="flex gap-1">
          <button className="p-1.5 rounded hover:bg-white/10 text-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 text-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 text-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
          <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-white/60 text-sm truncate">{url}</span>
        </div>

        {/* Bookmark */}
        <button className="p-1.5 rounded hover:bg-white/10 text-white/40">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      </div>

      {/* Content - Nice Preview Card */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full"
        >
          {/* Site Card */}
          <div 
            className="rounded-2xl p-8 text-center border border-white/10 shadow-2xl"
            style={{ backgroundColor: info.color + '20' }}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-7xl mb-6"
            >
              {info.icon}
            </motion.div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
            
            {/* URL */}
            <p className="text-white/50 text-sm mb-4 font-mono">{url}</p>
            
            {/* Description */}
            <p className="text-white/70 mb-8">{info.description}</p>

            {/* Open Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpen}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#E95420] hover:bg-[#E95420]/90 text-white font-medium rounded-xl transition-colors shadow-lg"
            >
              <span>Open {title.split(' ')[0]}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.button>
          </div>

          {/* Security Notice */}
          <p className="text-white/30 text-xs text-center mt-4">
            🔒 Opens in a secure new tab
          </p>
        </motion.div>
      </div>
    </div>
  )
}
