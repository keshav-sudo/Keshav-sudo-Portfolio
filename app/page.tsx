'use client'

import AnimatedBackground from '@/components/AnimatedBackground'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import GitHubStats from '@/components/GitHubStats'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <GitHubStats />
        <Projects />
        <Footer />
      </main>
    </>
  )
}
