'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { usePortfolio, Project, Skill } from '../../context/PortfolioContext'

export default function DashboardPage() {
  const { isLoggedIn, logout, projects, addProject, updateProject, deleteProject, skills, addSkill, deleteSkill } = usePortfolio()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects')

  // Form States
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  
  const [showSkillModal, setShowSkillModal] = useState(false)
  
  // Project Form
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    title: '', year: '', description: '', tech: [], github: '', demo: ''
  })
  
  // Skill Form
  const [skillForm, setSkillForm] = useState<Omit<Skill, 'id'>>({
    name: '', category: ''
  })

  useEffect(() => {
    if (!localStorage.getItem('isAdminLoggedIn')) {
      router.push('/admin/login')
    }
  }, [isLoggedIn, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Project Handlers
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProject) {
      updateProject(editingProject.id, { ...projectForm, id: editingProject.id })
    } else {
      addProject({ ...projectForm, id: Date.now().toString() })
    }
    setShowProjectModal(false)
    setEditingProject(null)
    setProjectForm({ title: '', year: '', description: '', tech: [], github: '', demo: '' })
  }

  const openEditProject = (project: Project) => {
    setEditingProject(project)
    setProjectForm(project)
    setShowProjectModal(true)
  }

  const openNewProject = () => {
    setEditingProject(null)
    setProjectForm({ title: '', year: '', description: '', tech: [], github: '', demo: '' })
    setShowProjectModal(true)
  }

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectForm({ ...projectForm, tech: e.target.value.split(',').map(s => s.trim()) })
  }

  // Skill Handlers
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault()
    addSkill({ ...skillForm, id: Date.now().toString() })
    setShowSkillModal(false)
    setSkillForm({ name: '', category: '' })
  }

  if (!isLoggedIn) return null

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
             <button onClick={() => router.push('/')} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              View Site
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
              Logout
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`text-lg font-semibold pb-4 -mb-4 border-b-2 transition-colors ${activeTab === 'projects' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`text-lg font-semibold pb-4 -mb-4 border-b-2 transition-colors ${activeTab === 'skills' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            Skills
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Projects</h2>
              <button 
                onClick={openNewProject}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                + Add Project
              </button>
            </div>

            <div className="grid gap-6">
              {projects.map(project => (
                <div key={project.id} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <h3 className="text-xl font-bold">{project.title}</h3>
                       <span className="text-xs px-2 py-0.5 bg-white/10 rounded border border-white/10 text-gray-300">{project.year}</span>
                    </div>
                    <p className="text-gray-400 mb-4 max-w-2xl">{project.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-black/40 border border-white/10 rounded text-gray-400">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditProject(project)} className="p-2 hover:bg-white/10 rounded text-blue-400">Edit</button>
                    <button onClick={() => deleteProject(project.id)} className="p-2 hover:bg-white/10 rounded text-red-400">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Skills</h2>
              <button 
                onClick={() => setShowSkillModal(true)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                + Add Skill
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
               {skills.map(skill => (
                 <div key={skill.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group">
                    <span className="font-semibold">{skill.name}</span>
                    <button onClick={() => deleteSkill(skill.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 text-red-400 rounded transition-all">✕</button>
                 </div>
               ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-2xl font-bold mb-6">{editingProject ? 'Edit Project' : 'New Project'}</h2>
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input required type="text" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Year</label>
                <input required type="text" value={projectForm.year} onChange={e => setProjectForm({...projectForm, year: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea required rows={4} value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tech Stack (comma separated)</label>
                <input type="text" value={projectForm.tech.join(', ')} onChange={handleTechChange} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm text-gray-400 mb-1">GitHub URL</label>
                  <input type="url" value={projectForm.github} onChange={e => setProjectForm({...projectForm, github: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-blue-500" />
                </div>
                 <div>
                  <label className="block text-sm text-gray-400 mb-1">Demo URL</label>
                  <input type="url" value={projectForm.demo} onChange={e => setProjectForm({...projectForm, demo: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setShowProjectModal(false)} className="px-4 py-2 hover:bg-white/10 rounded">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-6">New Skill</h2>
            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                 <label className="block text-sm text-gray-400 mb-1">Skill Name</label>
                 <input required type="text" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                 <label className="block text-sm text-gray-400 mb-1">Category</label>
                 <select required value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-purple-500">
                    <option value="">Select Category</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Tools">Tools</option>
                    <option value="Language">Language</option>
                    <option value="Styling">Styling</option>
                    <option value="Cloud">Cloud</option>
                 </select>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setShowSkillModal(false)} className="px-4 py-2 hover:bg-white/10 rounded">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded font-bold">Add Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
