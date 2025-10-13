'use client'

import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section className="min-h-screen py-32 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Experience</h2>
          <div className="h-px w-20 bg-white/30"></div>
        </motion.div>

        <div className="minimal-card p-8 md:p-12 group relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="grid md:grid-cols-12 gap-8 relative">
            
            <div className="md:col-span-3">
              <div className="text-white/60 text-sm mb-2 font-semibold">2024 — Present</div>
              <div className="text-white/50 text-xs font-medium">Current Role</div>
            </div>

            <div className="md:col-span-9 space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Full-Stack Web Developer Intern</h3>
                <div className="text-white/80 text-lg font-semibold">Clinix Sphere</div>
              </div>

              <div className="space-y-4">
                <p className="text-white/75 font-normal leading-relaxed text-base">
                  Designed and developed complete backend architecture from scratch using TypeScript, Node.js, and PostgreSQL. 
                  Implemented authentication systems, RESTful APIs, and integrated third-party services.
                </p>

                <div>
                  <div className="text-sm text-white/60 mb-3 font-semibold">Key Responsibilities:</div>
                  <ul className="space-y-2">
                    {[
                      'Built scalable backend architecture',
                      'Implemented JWT authentication',
                      'Database design with PostgreSQL',
                      'RESTful API development',
                      'Third-party integrations'
                    ].map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-3 text-white/75 font-normal"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1.5 h-1.5 bg-white/70 rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {['TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT'].map((tech) => (
                    <motion.span 
                      key={tech} 
                      className="px-3 py-1.5 text-xs border border-white/20 text-white/70 font-semibold hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
