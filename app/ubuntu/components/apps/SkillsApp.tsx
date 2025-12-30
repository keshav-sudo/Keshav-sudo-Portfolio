'use client'

import { motion } from 'framer-motion'

interface Skill {
  name: string
  icon: string
  level: number // 1-100
}

interface SkillCategory {
  name: string
  icon: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', icon: '⚛️', level: 90 },
      { name: 'Next.js', icon: '▲', level: 85 },
      { name: 'TypeScript', icon: '📘', level: 88 },
      { name: 'Tailwind CSS', icon: '🎨', level: 92 },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', icon: '🟢', level: 90 },
      { name: 'Express', icon: '🚂', level: 88 },
      { name: 'PostgreSQL', icon: '🐘', level: 85 },
      { name: 'MongoDB', icon: '🍃', level: 82 },
      { name: 'Prisma', icon: '💎', level: 80 },
    ],
  },
  {
    name: 'DevOps & Tools',
    icon: '🔧',
    skills: [
      { name: 'Docker', icon: '🐳', level: 75 },
      { name: 'Git', icon: '📦', level: 90 },
      { name: 'Nginx', icon: '🌐', level: 70 },
      { name: 'Redis', icon: '🔴', level: 72 },
      { name: 'Kafka', icon: '📨', level: 65 },
    ],
  },
]

export default function SkillsApp() {
  return (
    <div className="p-6 text-white min-h-full bg-gradient-to-br from-[#1a1a1a] to-[#242424] overflow-y-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6 flex items-center gap-3"
      >
        <span className="text-3xl">⚡</span> Skills & Technologies
      </motion.h1>

      <div className="grid gap-6">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="bg-white/5 rounded-xl p-5 border border-white/10"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>{category.icon}</span> {category.name}
            </h2>

            <div className="grid gap-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span>{skill.icon}</span>
                      <span className="text-white/80">{skill.name}</span>
                    </div>
                    <span className="text-white/50 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 + 0.2, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #E95420, #772953)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-white/5 rounded-xl p-5 border border-white/10"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>🌟</span> Also Proficient In
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            'JWT',
            'REST APIs',
            'GraphQL',
            'Socket.io',
            'AWS',
            'Vercel',
            'CI/CD',
            'Linux',
            'Microservices',
          ].map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-white/5 text-white/70 rounded-lg text-sm border border-white/10 hover:border-[#E95420]/50 hover:text-white transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
