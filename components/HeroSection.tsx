'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
      
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={{ left: '-20px', top: '-20px' }} />
      <div ref={dotRef} className="custom-cursor-dot" style={{ left: '-3px', top: '-3px' }} />

      <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12 overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
        
        {/* Multiple animated gradient orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-white/8 to-white/0 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-3xl animate-float-delayed opacity-60"></div>
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl animate-pulse-slow opacity-40"></div>
        
        <div className="max-w-7xl w-full relative z-10">
          
          <div className="max-w-5xl mx-auto space-y-8">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex justify-center mb-12 mt-8"
            >
              <motion.div 
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Main glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-transparent rounded-full blur-3xl group-hover:blur-[60px] transition-all duration-700 scale-125 animate-pulse-slow"></div>
                
                {/* Secondary rotating glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-white/50 group-hover:border-white/80 transition-all duration-700 shadow-[0_0_50px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_100px_rgba(255,255,255,0.35)] backdrop-blur-sm bg-gradient-to-br from-black/60 to-black/80">
                  <motion.img
                    src="/182376349.png"
                    alt="Keshav Sharma"
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 brightness-110"
                    whileHover={{ rotate: 2 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 group-hover:to-black/20 transition-all duration-700"></div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-full"></div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                  </div>
                </div>
                
                <div className="absolute -inset-3 bg-gradient-to-r from-white/0 via-white/50 to-white/0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                
                {/* Decorative corner elements with enhanced animation */}
                <motion.div 
                  className="absolute -top-2 -left-2 w-7 h-7 border-t-2 border-l-2 border-white/40 group-hover:border-white/70 transition-all duration-500"
                  whileHover={{ scale: 1.2, x: -2, y: -2 }}
                />
                <motion.div 
                  className="absolute -top-2 -right-2 w-7 h-7 border-t-2 border-r-2 border-white/40 group-hover:border-white/70 transition-all duration-500"
                  whileHover={{ scale: 1.2, x: 2, y: -2 }}
                />
                <motion.div 
                  className="absolute -bottom-2 -left-2 w-7 h-7 border-b-2 border-l-2 border-white/40 group-hover:border-white/70 transition-all duration-500"
                  whileHover={{ scale: 1.2, x: -2, y: 2 }}
                />
                <motion.div 
                  className="absolute -bottom-2 -right-2 w-7 h-7 border-b-2 border-r-2 border-white/40 group-hover:border-white/70 transition-all duration-500"
                  whileHover={{ scale: 1.2, x: 2, y: 2 }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-center tracking-tight bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                  Keshav Sharma
                </h1>
                <motion.div 
                  className="hidden lg:block relative group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative px-4 py-2 border border-green-400/40 bg-gradient-to-r from-green-950/50 to-emerald-950/50 backdrop-blur-sm text-xs font-semibold tracking-wider flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
                    AVAILABLE FOR WORK
                  </div>
                </motion.div>
              </div>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-6"></div>
              
              {/* Social Links */}
              <motion.div 
                className="flex justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <a 
                  href="https://github.com/thesharmakeshav" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-3 border border-white/25 hover:border-white/50 transition-all duration-500 hover:bg-white/8 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  aria-label="GitHub"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/keshav09sharma/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-3 border border-white/25 hover:border-white/50 transition-all duration-500 hover:bg-white/8 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  aria-label="LinkedIn"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/keshavsharmma"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-3 border border-white/25 hover:border-white/50 transition-all duration-500 hover:bg-white/8 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  aria-label="X (Twitter)"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="mailto:thesharmakeshav@gmail.com"
                  className="group relative p-3 border border-white/25 hover:border-white/50 transition-all duration-500 hover:bg-white/8 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  aria-label="Email"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="w-5 h-5 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-center font-light max-w-3xl mx-auto"
            >
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                Full-Stack Developer building scalable backend systems
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-white/5 blur-2xl rounded-lg group-hover:bg-white/8 transition-all duration-500"></div>
                <div className="minimal-card px-8 py-5 relative">
                  <div className="flex items-center gap-6 flex-wrap justify-center text-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.6)]"></div>
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
                      </div>
                      <span className="text-white font-bold">Clinix Sphere Intern</span>
                    </div>
                    <div className="h-5 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white/60 font-medium">Experience:</span>{' '}
                      <span className="text-white font-bold">2 Years</span>
                    </div>
                    <div className="h-5 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-white/60 font-medium">Projects:</span>{' '}
                      <span className="text-white font-bold">3 Live</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-3 text-sm text-white/70 font-medium"
            >
              {['TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'Nginx', 'Kafka', 'Redis'].map((tech, i) => (
                <motion.span 
                  key={i} 
                  className="relative px-5 py-2.5 border border-white/20 hover:border-white/50 transition-all duration-500 overflow-hidden group backdrop-blur-sm hover:bg-white/5"
                  whileHover={{ y: -3, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + (i * 0.05) }}
                >
                  <span className="relative z-10 font-semibold">{tech}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  </div>
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-white/5 border border-white/35 hover:border-white/70 hover:bg-white/10 transition-all duration-500 overflow-hidden min-w-[200px] backdrop-blur-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                  View Work
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download="Keshav_Sharma_Resume.pdf"
                className="group relative px-8 py-4 bg-white text-black hover:bg-white/95 transition-all duration-500 min-w-[200px] text-center font-semibold overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Download Resume
                  <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
              </motion.a>

              <motion.a
                href="mailto:thesharmakeshav@gmail.com"
                className="group relative px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/8 transition-all duration-500 min-w-[200px] text-center font-semibold overflow-hidden backdrop-blur-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get in Touch
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-center pt-12"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/15 bg-white/5 backdrop-blur-sm">
                <span className="text-xs text-white/50 font-medium tracking-[0.15em] uppercase">
                  5th Sem CSE Student
                </span>
                <div className="w-1 h-1 rounded-full bg-white/30"></div>
                <span className="text-xs text-white/50 font-medium tracking-[0.15em] uppercase">
                  Available for Remote Work
                </span>
              </div>
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div 
              className="flex flex-col items-center gap-3 text-white/50 cursor-pointer hover:text-white/70 transition-colors duration-300"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">Scroll</span>
              <div className="relative">
                <div className="w-px h-16 bg-gradient-to-b from-white/40 via-white/20 to-transparent"></div>
                <motion.div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                  animate={{ y: [0, 48, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  )
}
