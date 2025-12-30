'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CommandOutput {
  command: string
  output: string
  isError?: boolean
}

const commands: Record<string, string | (() => string)> = {
  help: `Available commands:
  whoami      - Display user information
  skills      - List technical skills
  projects    - Show project list
  experience  - Display work experience
  contact     - Show contact information
  clear       - Clear terminal
  neofetch    - System information
  date        - Display current date
  echo        - Echo back text
  ls          - List files
  cat resume  - View resume`,

  whoami: `keshav-sharma
Full-Stack Developer | Backend Specialist
Currently building scalable systems at Clinix Sphere`,

  skills: `┌─────────────────────────────────────────┐
│           TECHNICAL SKILLS               │
├─────────────────────────────────────────┤
│ Frontend:  React, Next.js, TypeScript   │
│ Backend:   Node.js, Express, Prisma     │
│ Database:  PostgreSQL, MongoDB, Redis   │
│ DevOps:    Docker, Nginx, AWS, CI/CD    │
│ Tools:     Git, Linux, Kafka            │
└─────────────────────────────────────────┘`,

  projects: `📁 Projects
├── DoctorPatient (2024)
│   └── Healthcare platform with JWT auth & appointments
├── Medium-Clone (2024)
│   └── Full-stack blogging with Cloudflare Workers
└── PayTm-Clone (2024)
    └── Digital payments app with wallet management`,

  experience: `💼 Experience
┌────────────────────────────────────────────┐
│ Clinix Sphere Intern      2024 - Present   │
│ Freelance Developer       2023 - 2024      │
│ B.Tech CS Student         2022 - 2026      │
└────────────────────────────────────────────┘`,

  contact: `📧 Contact Information
──────────────────────────
Email:    thesharmakeshav@gmail.com
GitHub:   github.com/keshav-sudo
LinkedIn: linkedin.com/in/keshav-sharmax
Location: India 🇮🇳`,

  neofetch: () => `
       .-/+oossssoo+/-.               keshav@portfolio
    \`:+ssssssssssssssssss+:\`           ------------------
  -+ssssssssssssssssssyyssss+-         OS: Ubuntu Portfolio 24.04 LTS
.ossssssssssssssssssdMMMNysssso.       Host: Web Browser
/ssssssssssshdmmNNmmyNMMNhsssss/       Kernel: Next.js 15
+sssssssshNNNNmyyyyymmMMMMhssss+       Uptime: ${Math.floor(Math.random() * 100)} days
osssssshNMNNNNNNNNmmmmdddddssso        Packages: npm (${Math.floor(Math.random() * 1000)})
osssshhhyyssssssssssssdddddysso        Shell: zsh 5.9
osssshhhyssssssssssssddddddysso        Terminal: Ubuntu Terminal
+sssyhhhy+ssssssssshhdddddyssss+       CPU: Your Browser @ 3.0 GHz
/sssyhyoooosssssooshddddddhssss/       Memory: 4GB / 8GB
.osssssssssssyyyyysdddddddmhso.
  -+ssssssssssssssssddddddmNh+-        ██████████████████████
    \`:+ssssssssssssssssNNNNNy+:\`       Colors: Ubuntu Orange
       .-/+oossssoo+/-.
`,

  date: () => new Date().toString(),

  ls: `Documents  Downloads  Music  Pictures  Projects  resume.txt`,

  'cat resume': `
╔══════════════════════════════════════════════╗
║              KESHAV SHARMA                   ║
║          Full-Stack Developer                ║
╠══════════════════════════════════════════════╣
║ SKILLS                                       ║
║ • TypeScript, Node.js, React, Next.js       ║
║ • PostgreSQL, MongoDB, Redis, Prisma        ║
║ • Docker, AWS, CI/CD, Linux                 ║
╠══════════════════════════════════════════════╣
║ EXPERIENCE                                   ║
║ • Clinix Sphere - Full-Stack Intern         ║
║ • 2 Years of Development Experience         ║
║ • 3+ Live Production Projects               ║
╚══════════════════════════════════════════════╝`,
}

export default function TerminalApp() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: '',
      output: `Welcome to Ubuntu Portfolio Terminal
Type 'help' for available commands.
──────────────────────────────────────`,
    },
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let output = ''
    let isError = false

    if (trimmedCmd === 'clear') {
      setHistory([])
      return
    }

    if (trimmedCmd.startsWith('echo ')) {
      output = cmd.substring(5)
    } else if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]
      output = typeof result === 'function' ? result() : result
    } else if (trimmedCmd === '') {
      output = ''
    } else {
      output = `Command not found: ${trimmedCmd}. Type 'help' for available commands.`
      isError = true
    }

    setHistory((prev) => [
      ...prev,
      { command: cmd, output, isError },
    ])

    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput)
      setCurrentInput('')
      setHistoryIndex(-1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else {
        setHistoryIndex(-1)
        setCurrentInput('')
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-[#300a24] font-mono text-sm overflow-hidden flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#2d0922] border-b border-white/10">
        <span className="text-white/60">📁</span>
        <span className="text-white/80">keshav@portfolio: ~</span>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {history.map((item, index) => (
          <div key={index}>
            {item.command && (
              <div className="flex items-center gap-2">
                <span className="text-green-400">keshav@portfolio</span>
                <span className="text-white/50">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white/50">$</span>
                <span className="text-white ml-2">{item.command}</span>
              </div>
            )}
            <pre
              className={`whitespace-pre-wrap ${
                item.isError ? 'text-red-400' : 'text-white/80'
              }`}
            >
              {item.output}
            </pre>
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex items-center gap-2">
          <span className="text-green-400">keshav@portfolio</span>
          <span className="text-white/50">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white/50">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 ml-2 bg-transparent text-white outline-none caret-white"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </motion.div>
  )
}
