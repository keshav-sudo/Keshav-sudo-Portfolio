'use client'

import { motion } from 'framer-motion'

export default function AboutApp() {
  return (
    <div className="p-6 text-white min-h-full bg-gradient-to-br from-[#1a1a1a] to-[#242424]">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6 mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E95420] to-[#772953] flex items-center justify-center text-4xl shadow-lg ring-4 ring-white/10">
            👤
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Keshav Sharma</h1>
            <p className="text-[#E95420] font-medium">Full-Stack Developer</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm">Available for Work</span>
            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 rounded-xl p-5 mb-6 border border-white/10"
        >
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span>📝</span> About
          </h2>
          <p className="text-white/80 leading-relaxed">
            Backend-first MERN+PostgreSQL Specialist passionate about Clean Code, 
            Automation & Problem-Solving. Building scalable backend systems with 
            modern technologies. Currently working as an Intern at Clinix Sphere.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          {[
            { label: 'Experience', value: '2 Years', icon: '⏱️' },
            { label: 'Projects', value: '3 Live', icon: '🚀' },
            { label: 'Current Role', value: 'Clinix Sphere', icon: '💼' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-4 text-center border border-white/10 hover:border-[#E95420]/50 transition-colors"
            >
              <span className="text-2xl">{stat.icon}</span>
              <div className="text-xl font-bold text-white mt-2">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 rounded-xl p-5 border border-white/10"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🔗</span> Connect
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'GitHub', icon: '🐙', url: 'https://github.com/keshav-sudo' },
              { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/keshav-sharmax' },
              { name: 'Email', icon: '📧', url: 'mailto:thesharmakeshav@gmail.com' },
              { name: 'X (Twitter)', icon: '🐦', url: 'https://twitter.com' },
            ].map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#E95420]/20 rounded-lg transition-colors border border-white/10 hover:border-[#E95420]/50"
              >
                <span>{link.icon}</span>
                <span className="text-sm">{link.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
