'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { DownloadIcon } from './Icons'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const secondaryRef = useRef<HTMLParagraphElement>(null)
  const mottoRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([nameRef.current, taglineRef.current, secondaryRef.current, mottoRef.current, ctaRef.current, imageRef.current], {
        opacity: 0,
        y: 30,
      })

      // Animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      })
        .to(nameRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, '-=0.5')
        .to(taglineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, '-=0.6')
        .to(secondaryRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, '-=0.6')
        .to(mottoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, '-=0.6')
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, '-=0.6')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d9ff]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d9ff]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Profile Image */}
        <div ref={imageRef} className="mb-8 flex justify-center">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#00d9ff] shadow-[0_0_20px_rgba(0,217,255,0.3)]">
            <img 
              src="/182376349.png" 
              alt="Keshav Sharma"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-6xl md:text-8xl font-black mb-6 gradient-text tracking-tight"
        >
          Keshav Sharma
        </h1>

        {/* Main Tagline */}
        <p
          ref={taglineRef}
          className="text-xl md:text-3xl font-medium mb-4 text-gray-300"
        >
          🚀 Full-Stack Developer | DevOps Learner | Open Source Contributor
        </p>

        {/* Secondary Tagline */}
        <p
          ref={secondaryRef}
          className="text-lg md:text-xl mb-8 text-gray-400 max-w-2xl mx-auto"
        >
          Backend-first MERN+PostgreSQL Specialist
        </p>

        {/* Motto */}
        <div
          ref={mottoRef}
          className="mb-12 inline-block glass-effect rounded-lg px-8 py-4"
        >
          <code className="text-[#00d9ff] text-lg md:text-xl font-mono">
            Code. Learn. Build. Repeat.
          </code>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 bg-[#00d9ff] text-[#0a0e27]er font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00d9ff]/50"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff] to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <a
            href="/resume.pdf"
            download
            className="group flex items-center gap-2 px-8 py-4 glass-effect rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:border-[#00d9ff] hover:bg-[#00d9ff]/10"
          >
            <DownloadIcon className="w-5 h-5 group-hover:animate-bounce" />
            Download Resume
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#00d9ff]/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#00d9ff] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
