'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ReactIcon,
  NodeIcon,
  MongoIcon,
  PostgreSQLIcon,
  TypeScriptIcon,
  DockerIcon,
  GitIcon,
  AWSIcon,
  TailwindIcon,
  NextJSIcon,
  RedisIcon,
} from './Icons'
import { usePortfolio } from '../app/context/PortfolioContext'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'React': ReactIcon,
  'Next.js': NextJSIcon,
  'TypeScript': TypeScriptIcon,
  'TailwindCSS': TailwindIcon,
  'Node.js': NodeIcon,
  'MongoDB': MongoIcon,
  'PostgreSQL': PostgreSQLIcon,
  'Redis': RedisIcon,
  'Docker': DockerIcon,
  'AWS': AWSIcon,
  'Git': GitIcon,
}

// Fallback for new skills added without specific icons
const DefaultIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const { skills } = usePortfolio()

  useEffect(() => {
    // Only run animation if we have cards
    if (!cardsRef.current.length) return
    
    const cards = cardsRef.current

    cards.forEach((card, index) => {
      // Staggered entrance animation
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 50%',
          },
          delay: index * 0.05,
        }
      )

      // Hover animation
      const icon = card.querySelector('.tech-icon')
      const tooltip = card.querySelector('.tech-tooltip')

      if (icon && tooltip) {
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: 'back.out(1.7)',
          })
          gsap.to(card, {
            y: -10,
            boxShadow: '0 20px 60px rgba(0, 217, 255, 0.3)',
            duration: 0.3,
          })
          gsap.to(tooltip, {
            opacity: 1,
            y: -5,
            duration: 0.2,
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
          gsap.to(card, {
            y: 0,
            boxShadow: '0 0 0 rgba(0, 217, 255, 0)',
            duration: 0.3,
          })
          gsap.to(tooltip, {
            opacity: 0,
            y: 0,
            duration: 0.2,
          })
        })
      }
    })
  }, [skills])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black mb-6 text-center gradient-text">
          Tech Stack & Expertise
        </h2>
        <p className="text-center text-gray-300 mb-16 text-lg max-w-2xl mx-auto font-medium">
          Cutting-edge technologies and tools I work with to build scalable, performant applications
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((tech) => {
            const IconComponent = iconMap[tech.name] || DefaultIcon
            
            return (
              <div
                key={tech.id}
                ref={addToRefs}
                className="glass-effect rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer relative group"
              >
                <div className="tech-icon text-[#00d9ff]">
                  <IconComponent className="w-12 h-12" />
                </div>
                
                <span className="text-sm font-semibold text-gray-200 text-center">
                  {tech.name}
                </span>
  
                {/* Tooltip */}
                <div className="tech-tooltip absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#0a0e27] border border-[#00d9ff] rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none z-50">
                  {tech.category}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#0a0e27] border-b border-r border-[#00d9ff] rotate-45"></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-200">Also Proficient In</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Express.js',
              'JWT',
              'REST APIs',
              'GraphQL',
              'Prisma',
              'Socket.io',
              'GitHub Actions',
              'CI/CD',
              'Microservices',
              'System Design',
            ].map((skill) => (
              <span
                key={skill}
                className="glass-effect px-4 py-2 rounded-full text-sm font-semibold text-gray-200 hover:text-[#00d9ff] hover:border-[#00d9ff]/50 transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
