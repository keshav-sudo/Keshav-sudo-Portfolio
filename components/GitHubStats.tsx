'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GitHubStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const githubUsername = 'keshav-sudo'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">GitHub Activity</h2>
          <div className="h-px w-20 bg-white/30 mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl font-normal">
            Code speaks louder than words. Here's my journey in commits, contributions, and continuous learning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* GitHub Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-white/5 blur-xl rounded-lg group-hover:bg-white/8 transition-all duration-500"></div>
            <div className="minimal-card p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Stats Overview</h3>
                <svg className="w-5 h-5 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="bg-black/40 rounded-lg overflow-hidden border border-white/10">
                {isVisible && (
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=transparent&hide_border=true&title_color=ffffff&icon_color=ffffff&text_color=ffffff&bg_color=00000000`}
                    alt="GitHub Stats"
                    className="w-full"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Languages Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-white/5 blur-xl rounded-lg group-hover:bg-white/8 transition-all duration-500"></div>
            <div className="minimal-card p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Languages</h3>
                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="bg-black/40 rounded-lg overflow-hidden border border-white/10">
                {isVisible && (
                  <img
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=transparent&hide_border=true&title_color=ffffff&text_color=ffffff&bg_color=00000000&langs_count=8`}
                    alt="Top Languages"
                    className="w-full"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Streak Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-white/5 blur-xl rounded-lg group-hover:bg-white/8 transition-all duration-500"></div>
            <div className="minimal-card p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Contribution Streak</h3>
                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <div className="bg-black/40 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center p-4">
                {isVisible && (
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=transparent&hide_border=true&ring=ffffff&fire=ffffff&currStreakLabel=ffffff&sideLabels=ffffff&currStreakNum=ffffff&dates=ffffff&sideNums=ffffff&background=00000000`}
                    alt="GitHub Streak"
                    className="w-full max-w-lg"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-white/5 blur-xl rounded-lg group-hover:bg-white/8 transition-all duration-500"></div>
            <div className="minimal-card p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Code Metrics</h3>
                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg">
                  <span className="text-white/70 font-medium">Total Repositories</span>
                  <span className="text-2xl font-bold">10+</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg">
                  <span className="text-white/70 font-medium">Years of Coding</span>
                  <span className="text-2xl font-bold">2+</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg">
                  <span className="text-white/70 font-medium">Live Projects</span>
                  <span className="text-2xl font-bold">3</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Graph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="group relative md:col-span-2"
          >
            <div className="absolute inset-0 bg-white/5 blur-xl rounded-lg group-hover:bg-white/8 transition-all duration-500"></div>
            <div className="minimal-card p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Contribution Activity</h3>
                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="bg-black/40 rounded-lg overflow-hidden border border-white/10">
                {isVisible && (
                  <img
                    src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=github-compact&hide_border=true&bg_color=00000000&color=ffffff&line=ffffff&point=ffffff&area=true&area_color=ffffff`}
                    alt="Contribution Activity"
                    className="w-full"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* View Profile Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/8 transition-all duration-500 backdrop-blur-sm font-semibold overflow-hidden"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative z-10">View Full GitHub Profile</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
