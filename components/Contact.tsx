'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl md:text-8xl font-mono text-[#0ff]/20">//</div>
            <h2 className="text-4xl md:text-6xl font-bold">GET IN TOUCH</h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 font-medium">
              Looking for a passionate full-stack developer? Let's build something amazing together.
            </p>

            <div className="space-y-4">
              <div className="project-card p-6 group hover:border-[#0ff]/60">
                <div className="text-sm font-mono text-gray-500 mb-2 font-semibold">EMAIL</div>
                <a href="mailto:thesharmakeshav@gmail.com" className="text-[#0ff] font-mono group-hover:underline font-medium">
                  thesharmakeshav@gmail.com
                </a>
              </div>

              <div className="project-card p-6 group hover:border-[#0ff]/60">
                <div className="text-sm font-mono text-gray-500 mb-2 font-semibold">GITHUB</div>
                <a href="https://github.com/keshav-sudo" target="_blank" rel="noopener noreferrer" className="text-[#0ff] font-mono group-hover:underline font-medium">
                  github.com/keshav-sudo
                </a>
              </div>

              <div className="project-card p-6 group hover:border-[#0ff]/60">
                <div className="text-sm font-mono text-gray-500 mb-2 font-semibold">LINKEDIN</div>
                <a href="https://linkedin.com/in/keshav-sharma" target="_blank" rel="noopener noreferrer" className="text-[#0ff] font-mono group-hover:underline font-medium">
                  linkedin.com/in/keshav-sharma
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="project-card p-8 space-y-6"
          >
            <div>
              <div className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4 font-semibold">Current Status</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#00ff88] rounded-full animate-pulse-neon" />
                <span className="text-lg font-mono text-[#00ff88] font-semibold">AVAILABLE FOR WORK</span>
              </div>
              <p className="text-gray-300 font-medium">
                Open to remote opportunities, freelance projects, and interesting collaborations.
              </p>
            </div>

            <div>
              <div className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4 font-semibold">Interests</div>
              <div className="flex flex-wrap gap-2">
                {['Backend Architecture', 'System Design', 'Microservices', 'DevOps', 'Open Source'].map((interest) => (
                  <span key={interest} className="px-3 py-2 border border-[#0ff]/20 text-sm text-gray-300 font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
