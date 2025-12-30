'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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

// This would normally come from a database/API, but for demo we use localStorage
const getProjects = (): Project[] => {
  if (typeof window === 'undefined') return defaultProjects
  const saved = localStorage.getItem('portfolio_projects')
  return saved ? JSON.parse(saved) : defaultProjects
}

const saveProjects = (projects: Project[]) => {
  localStorage.setItem('portfolio_projects', JSON.stringify(projects))
}

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'DoctorPatient',
    year: '2024',
    description: 'Enterprise healthcare platform with JWT authentication, role-based access, appointment scheduling, and prescription management.',
    tech: ['TypeScript', 'Node.js', 'Prisma', 'PostgreSQL', 'JWT', 'Express'],
    github: 'https://github.com/keshav-sudo/DoctorPateint',
    demo: 'https://doctor-pateint.vercel.app/',
    icon: '🏥',
  },
  {
    id: '2',
    title: 'Medium Clone',
    year: '2024',
    description: 'Full-stack blogging platform with Cloudflare Workers backend. Features rich text editing and user authentication.',
    tech: ['React', 'Cloudflare Workers', 'Prisma', 'PostgreSQL', 'Hono'],
    github: 'https://github.com/keshav-sudo/Medium-clone',
    demo: 'https://medium-clone-ochre-two.vercel.app/',
    icon: '📝',
  },
  {
    id: '3',
    title: 'PayTm Clone',
    year: '2024',
    description: 'Digital payments application with secure user authentication, wallet management, and real-time transaction processing.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    github: 'https://github.com/keshav-sudo/Paytm-Clone',
    demo: 'https://paytm-clone-frontend.vercel.app/',
    icon: '💳',
  },
]

export default function SettingsApp() {
  const [activeTab, setActiveTab] = useState<'general' | 'projects' | 'profile' | 'about'>('general')
  const [projects, setProjects] = useState<Project[]>(getProjects())
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveProjects = () => {
    saveProjects(projects)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleAddProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() }
    const updated = [...projects, newProject]
    setProjects(updated)
    saveProjects(updated)
    setShowAddForm(false)
  }

  const handleUpdateProject = (project: Project) => {
    const updated = projects.map((p) => (p.id === project.id ? project : p))
    setProjects(updated)
    saveProjects(updated)
    setEditingProject(null)
  }

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id)
    setProjects(updated)
    saveProjects(updated)
  }

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
  ]

  return (
    <div className="flex h-full bg-[#1a1a1a]">
      {/* Sidebar */}
      <div className="w-56 bg-[#252525] border-r border-white/10 p-4">
        <h2 className="text-white/50 text-xs uppercase tracking-wider mb-4">Settings</h2>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
              activeTab === tab.id
                ? 'bg-[#E95420] text-white'
                : 'text-white/70 hover:bg-white/5'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'general' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-white mb-6">General Settings</h1>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Appearance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Dark Mode</span>
                    <div className="w-12 h-6 bg-[#E95420] rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Animations</span>
                    <div className="w-12 h-6 bg-[#E95420] rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Boot Screen</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Show BIOS Screen</span>
                    <div className="w-12 h-6 bg-[#E95420] rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Boot Duration</span>
                    <span className="text-white/50 text-sm">4 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-[#E95420] hover:bg-[#E95420]/80 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <span>+</span> Add Project
              </button>
            </div>

            {saved && (
              <div className="mb-4 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
                ✓ Projects saved successfully!
              </div>
            )}

            {/* Add/Edit Form */}
            {(showAddForm || editingProject) && (
              <ProjectForm
                project={editingProject}
                onSave={(p) => editingProject ? handleUpdateProject(p as Project) : handleAddProject(p)}
                onCancel={() => {
                  setShowAddForm(false)
                  setEditingProject(null)
                }}
              />
            )}

            {/* Projects List */}
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/5 rounded-xl p-5 border border-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{project.icon}</span>
                      <div>
                        <h3 className="text-white font-medium">{project.title}</h3>
                        <p className="text-white/50 text-sm">{project.year}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/70 rounded-lg text-sm transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mt-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#E95420]/20 text-[#E95420] rounded text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-white mb-6">Profile Settings</h1>
            
            <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
              <div>
                <label className="text-white/70 text-sm block mb-2">Name</label>
                <input
                  type="text"
                  defaultValue="Keshav Sharma"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-2">Title</label>
                <input
                  type="text"
                  defaultValue="Full-Stack Developer"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="thesharmakeshav@gmail.com"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-2">GitHub URL</label>
                <input
                  type="url"
                  defaultValue="https://github.com/keshav-sudo"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  defaultValue="https://linkedin.com/in/keshav-sharmax"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none transition-colors"
                />
              </div>
              <button className="px-4 py-2 bg-[#E95420] hover:bg-[#E95420]/80 text-white rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'about' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-white mb-6">About This Portfolio</h1>
            
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🐧</div>
                <h2 className="text-xl font-bold text-white">Ubuntu Portfolio OS</h2>
                <p className="text-white/50">Version 24.04 LTS</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Framework</span>
                  <span className="text-white">Next.js 15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Styling</span>
                  <span className="text-white">Tailwind CSS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Animations</span>
                  <span className="text-white">Framer Motion</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Developer</span>
                  <span className="text-white">Keshav Sharma</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-white/40 text-xs">
                  Inspired by Ubuntu Linux Desktop
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project: Project | null
  onSave: (project: Omit<Project, 'id'> | Project) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    title: project?.title || '',
    year: project?.year || new Date().getFullYear().toString(),
    description: project?.description || '',
    tech: project?.tech.join(', ') || '',
    github: project?.github || '',
    demo: project?.demo || '',
    icon: project?.icon || '📁',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const projectData = {
      ...form,
      tech: form.tech.split(',').map((t) => t.trim()),
    }
    if (project) {
      onSave({ ...projectData, id: project.id })
    } else {
      onSave(projectData)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2a2a2a] rounded-xl p-5 border border-white/10 mb-6"
      onSubmit={handleSubmit}
    >
      <h3 className="text-white font-medium mb-4">
        {project ? 'Edit Project' : 'Add New Project'}
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-white/70 text-sm block mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none text-sm"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm block mb-1">Year</label>
          <input
            type="text"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none text-sm"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-white/70 text-sm block mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none text-sm resize-none h-20"
          required
        />
      </div>

      <div className="mb-4">
        <label className="text-white/70 text-sm block mb-1">Technologies (comma separated)</label>
        <input
          type="text"
          value={form.tech}
          onChange={(e) => setForm({ ...form, tech: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none text-sm"
          placeholder="React, Node.js, PostgreSQL"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-white/70 text-sm block mb-1">GitHub URL</label>
          <input
            type="url"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none text-sm"
          />
        </div>
        <div>
          <label className="text-white/70 text-sm block mb-1">Demo URL</label>
          <input
            type="url"
            value={form.demo}
            onChange={(e) => setForm({ ...form, demo: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none text-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-white/70 text-sm block mb-1">Icon (emoji)</label>
        <input
          type="text"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="w-20 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#E95420] outline-none text-sm text-center"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-[#E95420] hover:bg-[#E95420]/80 text-white rounded-lg text-sm transition-colors"
        >
          {project ? 'Update Project' : 'Add Project'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/70 rounded-lg text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  )
}
