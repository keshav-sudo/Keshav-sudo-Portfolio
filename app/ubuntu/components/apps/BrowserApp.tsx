

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

  const handleOpenExternal = () => {
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

        {/* Open in New Tab Button */}
        <button 
          onClick={handleOpenExternal}
          className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          title="Open in new tab"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>

      {/* Embedded Website Content */}
      <div className="flex-1 relative bg-white overflow-hidden">
        <iframe
          src={url}
          className="w-full h-full border-0"
          title={title}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          loading="lazy"
        />
      </div>
    </div>
  )
}
