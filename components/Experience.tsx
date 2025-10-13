'use client'

import { motion } from 'framer-motion'

export default function Experience() {
  return (
    <section className="py-20 px-6 relative z-10">
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
            <h2 className="text-4xl md:text-6xl font-bold">EXPERIENCE</h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="project-card p-8"
        >
          <div className="grid md:grid-cols-12 gap-8">
            
            {/* Timeline */}
            <div className="md:col-span-3">
              <div className="text-[#0ff] font-mono text-sm mb-2 font-semibold">2024 - Present</div>
              <div className="text-gray-500 text-sm font-mono font-medium">2 Months</div>
            </div>

            {/* Content */}
            <div className="md:col-span-9 space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Full-Stack Web Developer Intern</h3>
                <div className="text-[#0ff] text-lg font-mono font-semibold">Clinix Sphere</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-2 font-semibold">Responsibilities:</div>
                  <ul className="space-y-2">
                    {[
                      'Designed and developed complete backend architecture from scratch',
                      'Built RESTful APIs with Node.js, Express, and TypeScript',
                      'Implemented authentication and authorization systems',
                      'Database design and optimization with PostgreSQL',
                      'Integrated third-party services and APIs',
                      'Collaborated with frontend team for seamless integration'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 font-medium">
                        <div className="w-1.5 h-1.5 bg-[#0ff] rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-2 font-semibold">Tech Stack:</div>
                  <div className="flex flex-wrap gap-2">
                    {['TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'REST API'].map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-mono border border-[#0ff]/20 text-gray-400 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
