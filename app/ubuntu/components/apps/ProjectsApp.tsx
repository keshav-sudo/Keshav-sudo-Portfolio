'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Project {
  id: string
  title: string
  year: string
  description: string
  tech: string[]
  github: string
  demo: string
  icon: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'DoctorPatient',
    year: '2024',
    description: 'Enterprise healthcare platform with JWT authentication, role-based access, appointment scheduling, and prescription management. Backend deployed on Render with PostgreSQL.',
    tech: ['TypeScript', 'Node.js', 'Prisma', 'PostgreSQL', 'JWT', 'Express'],
    github: 'https://github.com/keshav-sudo/DoctorPateint',
    demo: 'https://doctor-pateint.vercel.app/',
    icon: '🏥',
  },
  {
    id: '2',
    title: 'Medium Clone',
    year: '2024',
    description: 'Full-stack blogging platform with Cloudflare Workers backend. Features rich text editing, user authentication, and optimized content delivery.',
    tech: ['React', 'Cloudflare Workers', 'Prisma', 'PostgreSQL', 'Hono'],
    github: 'https://github.com/keshav-sudo/Medium-clone',
    demo: 'https://medium-clone-ochre-two.vercel.app/',
    icon: '📝',
  },
  {
    id: '3',
    title: 'PayTm Clone',
    year: '2024',
    description: 'Digital payments application with secure user authentication, wallet management, and real-time transaction processing using modern web technologies.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    github: 'https://github.com/keshav-sudo/Paytm-Clone',
    demo: 'https://paytm-clone-frontend.vercel.app/',
    icon: '💳',
  },
]

export default function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="flex h-full bg-[#1a1a1a]">
      {/* Sidebar - Project List */}
      <div className="w-64 bg-[#252525] border-r border-white/10 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-white/50 text-xs uppercase tracking-wider mb-3">Projects</h2>
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className={`w-full text-left p-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
                selectedProject?.id === project.id
                  ? 'bg-[#E95420] text-white'
                  : 'hover:bg-white/5 text-white/80'
              }`}
            >
              <span className="text-xl">{project.icon}</span>
              <div>
                <div className="font-medium text-sm">{project.title}</div>
                <div className="text-xs opacity-60">{project.year}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedProject ? (
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            {/* Project Header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{selectedProject.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-white">{selectedProject.title}</h1>
                <p className="text-[#E95420]">{selectedProject.year}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 rounded-xl p-5 mb-6 border border-white/10">
              <h3 className="text-white/50 text-sm uppercase tracking-wider mb-2">Description</h3>
              <p className="text-white/80 leading-relaxed">{selectedProject.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="bg-white/5 rounded-xl p-5 mb-6 border border-white/10">
              <h3 className="text-white/50 text-sm uppercase tracking-wider mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#E95420]/20 text-[#E95420] rounded-full text-sm border border-[#E95420]/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <span>🐙</span> View Code
              </a>
              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#E95420] hover:bg-[#E95420]/80 rounded-lg transition-colors text-white"
              >
                <span>🚀</span> Live Demo
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-white/40">
            <div className="text-center">
              <span className="text-6xl mb-4 block">📂</span>
              <p>Select a project to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
