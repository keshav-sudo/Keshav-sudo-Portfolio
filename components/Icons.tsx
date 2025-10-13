'use client'

interface IconProps {
  className?: string
}

export const ReactIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 2C8.5 2 3 4 3 8c0 4 5.5 6 9 6s9-2 9-6c0-4-5.5-6-9-6z" />
    <path d="M12 22c3.5 0 9-2 9-6 0-4-5.5-6-9-6s-9 2-9 6c0 4 5.5 6 9 6z" />
    <path d="M5 12c0 3.5 2 9 7 9s7-5.5 7-9-2-9-7-9-7 5.5-7 9z" />
  </svg>
)

export const NodeIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z" />
    <path d="M12 8v8" />
    <path d="M8 10v4" />
    <path d="M16 10v4" />
  </svg>
)

export const MongoIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2C8 6 6 10 6 14c0 4 2 6 6 8 4-2 6-4 6-8 0-4-2-8-6-12z" />
    <path d="M12 18v4" />
    <circle cx="12" cy="14" r="1.5" />
  </svg>
)

export const PostgreSQLIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="8" rx="8" ry="4" />
    <path d="M4 8v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8" />
    <path d="M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4" />
  </svg>
)

export const TypeScriptIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
    <path d="M9 9l3-3 3 3" />
  </svg>
)

export const DockerIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="8" width="3" height="3" />
    <rect x="8" y="8" width="3" height="3" />
    <rect x="12" y="8" width="3" height="3" />
    <rect x="8" y="12" width="3" height="3" />
    <rect x="12" y="12" width="3" height="3" />
    <path d="M3 15c0 2 1 4 4 4h10c3 0 4-2 4-4" />
    <path d="M21 11c-1-2-3-3-5-3" />
  </svg>
)

export const GitIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 12l-9-9-3 3 9 9 9 9 3-3z" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
)

export const AWSIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 16l9-4 9 4-9 4-9-4z" />
    <path d="M3 12l9-4 9 4-9 4-9-4z" />
    <path d="M3 8l9-4 9 4-9 4L3 8z" />
  </svg>
)

export const TailwindIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 6C9 6 7.5 7.5 7.5 10.5c0 1.5.75 2.25 2.25 2.25 2.25 0 3-1.5 5.25-1.5 1.5 0 2.25.75 2.25 2.25 0 3-1.5 4.5-4.5 4.5-3 0-4.5-1.5-4.5-4.5" />
    <circle cx="12" cy="12" r="10" />
  </svg>
)

export const NextJSIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 9l6 6" />
    <path d="M15 9v6" />
  </svg>
)

export const RedisIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 8l8-3 8 3-8 3-8-3z" />
    <path d="M4 12l8 3 8-3" />
    <path d="M4 16l8 3 8-3" />
    <circle cx="16" cy="8" r="1.5" />
  </svg>
)

export const GitHubIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

export const LinkedInIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export const EmailIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

export const DownloadIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export const ExternalLinkIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export const TrophyIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
)
