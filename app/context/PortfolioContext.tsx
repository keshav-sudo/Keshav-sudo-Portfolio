'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types
export interface Project {
  id: string
  title: string
  year: string
  description: string
  tech: string[]
  github?: string
  demo?: string
}

export interface Skill {
  id: string
  name: string
  category: string
}

const initialSkills: Skill[] = [
  { id: '1', name: 'React', category: 'Frontend' },
  { id: '2', name: 'Next.js', category: 'Frontend' },
  { id: '3', name: 'TypeScript', category: 'Language' },
  { id: '4', name: 'TailwindCSS', category: 'Styling' },
  { id: '5', name: 'Node.js', category: 'Backend' },
  { id: '6', name: 'MongoDB', category: 'Database' },
  { id: '7', name: 'PostgreSQL', category: 'Database' },
  { id: '8', name: 'Redis', category: 'Database' },
  { id: '9', name: 'Docker', category: 'DevOps' },
  { id: '10', name: 'AWS', category: 'Cloud' },
  { id: '11', name: 'Git', category: 'Tools' },
]

interface PortfolioContextType {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (id: string, project: Project) => void
  deleteProject: (id: string) => void
  skills: Skill[]
  addSkill: (skill: Skill) => void
  deleteSkill: (id: string) => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

// Initial Data
const initialProjects: Project[] = [
  {
    id: '1',
    title: 'DoctorPatient',
    year: '2024',
    description: 'Enterprise healthcare platform with JWT authentication, role-based access, appointment scheduling, and prescription management. Backend deployed on Render with PostgreSQL.',
    tech: ['TypeScript', 'Node.js', 'Prisma', 'PostgreSQL', 'JWT', 'Express'],
    github: 'https://github.com/keshav-sudo/DoctorPateint',
    demo: 'https://doctor-pateint.vercel.app/',
  },
  {
    id: '2',
    title: 'SocialHub',
    year: '2024',
    description: 'Distributed social network with microservices architecture, Kafka event streaming, Redis Pub/Sub for real-time features, and hybrid MongoDB/PostgreSQL database strategy.',
    tech: ['Docker', 'Nginx', 'TypeScript', 'Kafka', 'Redis', 'MongoDB', 'PostgreSQL'],
    github: 'https://github.com/keshav-sudo/socialHub',
  },
  {
    id: '3',
    title: 'Trading Platform',
    year: '2024',
    description: 'High-performance cryptocurrency trading platform with real-time market data, WebSocket integration, and secure transaction handling.',
    tech: ['TypeScript', 'WebSocket', 'Redis', 'PostgreSQL', 'Docker'],
  }
]

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [skills, setSkills] = useState<Skill[]>(initialSkills)

  useEffect(() => {
    // Check localStorage for login status
    const storedLogin = localStorage.getItem('isAdminLoggedIn')
    if (storedLogin === 'true') {
      setIsLoggedIn(true)
    }
    
    // Check localStorage for projects
    const storedProjects = localStorage.getItem('portfolio_projects')
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects))
    }

    // Check localStorage for skills
    const storedSkills = localStorage.getItem('portfolio_skills')
    if (storedSkills) {
      setSkills(JSON.parse(storedSkills))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills))
  }, [skills])

  const login = () => {
    setIsLoggedIn(true)
    localStorage.setItem('isAdminLoggedIn', 'true')
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isAdminLoggedIn')
  }

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev])
  }

  const updateProject = (id: string, updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === id ? updatedProject : p))
  }

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  const addSkill = (skill: Skill) => {
    setSkills(prev => [...prev, skill])
  }

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id))
  }

  return (
    <PortfolioContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      projects,
      addProject,
      updateProject,
      deleteProject,
      skills,
      addSkill,
      deleteSkill
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
