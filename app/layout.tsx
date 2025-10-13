import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Keshav Sharma | Full-Stack Developer & DevOps Learner',
  description: 'Backend-first MERN+PostgreSQL Specialist. Passionate about Clean Code, Automation & Problem-Solving.',
  keywords: ['Full-Stack Developer', 'MERN Stack', 'DevOps', 'PostgreSQL', 'React', 'Node.js'],
  authors: [{ name: 'Keshav Sharma' }],
  openGraph: {
    title: 'Keshav Sharma | Full-Stack Developer',
    description: 'Backend-first MERN+PostgreSQL Specialist',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
