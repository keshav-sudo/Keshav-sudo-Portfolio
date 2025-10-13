'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GitHubIcon } from './Icons'

gsap.registerPlugin(ScrollTrigger)

export default function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        scale: 0.9,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 55%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Floating animation for the icon
    gsap.to('.github-icon-float', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          ref={contentRef}
          className="glass-effect rounded-3xl p-12 text-center relative overflow-hidden border-2 border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all duration-500"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d9ff]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="github-icon-float flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00d9ff] to-emerald-400 rounded-full flex items-center justify-center">
                <GitHubIcon className="w-10 h-10 text-[#0a0e27]er" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-black mb-4 gradient-text">
              Open Source Contributor
            </h2>

            {/* Statement */}
            <p className="text-xl md:text-2xl text-gray-200 mb-6 font-semibold">
              Contributing to Open Source & Building Real-World Scalable Systems
            </p>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
              Actively contributing to open-source projects, collaborating with developers worldwide,
              and building solutions that make a real impact in the developer community.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mt-8">
              <div className="glass-effect rounded-xl p-4">
                <div className="text-3xl font-black gradient-text mb-1">50+</div>
                <div className="text-sm text-gray-300 font-medium">Contributions</div>
              </div>
              <div className="glass-effect rounded-xl p-4">
                <div className="text-3xl font-black gradient-text mb-1">10+</div>
                <div className="text-sm text-gray-300 font-medium">Repositories</div>
              </div>
              <div className="glass-effect rounded-xl p-4">
                <div className="text-3xl font-black gradient-text mb-1">5+</div>
                <div className="text-sm text-gray-300 font-medium">Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
