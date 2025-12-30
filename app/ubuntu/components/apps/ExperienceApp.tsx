'use client'

import { motion } from 'framer-motion'

interface Experience {
  title: string
  company: string
  period: string
  description: string
  icon: string
  type: 'work' | 'education'
}

const experiences: Experience[] = [
  {
    title: 'Full-Stack Intern',
    company: 'Clinix Sphere',
    period: '2024 - Present',
    description: 'Working on enterprise healthcare solutions. Building scalable backend systems with Node.js, PostgreSQL, and implementing secure authentication flows.',
    icon: '🏥',
    type: 'work',
  },
  {
    title: 'Freelance Developer',
    company: 'Self-Employed',
    period: '2023 - 2024',
    description: 'Built multiple full-stack applications for clients. Specialized in MERN stack development and modern web technologies.',
    icon: '💻',
    type: 'work',
  },
  {
    title: 'B.Tech in Computer Science',
    company: 'University',
    period: '2022 - 2026',
    description: 'Pursuing Bachelor of Technology in Computer Science. Focus on Data Structures, Algorithms, and Software Engineering.',
    icon: '🎓',
    type: 'education',
  },
]

export default function ExperienceApp() {
  return (
    <div className="p-6 text-white min-h-full bg-gradient-to-br from-[#1a1a1a] to-[#242424] overflow-y-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-8 flex items-center gap-3"
      >
        <span className="text-3xl">💼</span> Experience & Education
      </motion.h1>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E95420] via-[#772953] to-transparent" />

        {/* Experience Items */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-16"
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 w-5 h-5 rounded-full bg-[#E95420] border-4 border-[#1a1a1a] z-10" />

              {/* Content Card */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-[#E95420]/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{exp.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                      <p className="text-[#E95420]">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        exp.type === 'work'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {exp.type === 'work' ? '💼 Work' : '📚 Education'}
                    </span>
                  </div>
                </div>

                <p className="text-white/50 text-sm mb-3">{exp.period}</p>
                <p className="text-white/70 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 grid grid-cols-3 gap-4"
      >
        {[
          { label: 'Years Coding', value: '2+', icon: '⏱️' },
          { label: 'Projects Built', value: '10+', icon: '🚀' },
          { label: 'Technologies', value: '15+', icon: '🛠️' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
          >
            <span className="text-2xl">{stat.icon}</span>
            <div className="text-2xl font-bold text-white mt-2">{stat.value}</div>
            <div className="text-white/50 text-sm">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
