/**
 * Site Configuration
 * Update this file to customize your portfolio
 */

export const siteConfig = {
  // Personal Information
  name: 'Keshav Sharma',
  tagline: '🚀 Full-Stack Developer | DevOps Learner | Open Source Contributor',
  secondaryTagline: 'Backend-first MERN+PostgreSQL Specialist',
  motto: 'Code. Learn. Build. Repeat.',
  
  // Contact
  email: 'your.email@example.com',
  github: 'yourusername',
  linkedin: 'yourusername',
  
  // About
  education: '5th Semester B.Tech CSE Student',
  currentGoal: 'Remote Developer Job / Internship in 4 Months',
  
  // Achievements
  milestones: [
    {
      title: 'Completed 1st Goal: Paid Internship',
      date: '4 September 2025',
      icon: '🏆',
    },
  ],
  
  // Open Source Stats (update these manually)
  openSourceStats: {
    contributions: '50+',
    repositories: '10+',
    projects: '5+',
  },
  
  // Skills
  skills: [
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
  ],
  
  // Social Links
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'mailto:your.email@example.com',
  },
  
  // Resume
  resumeUrl: '/resume.pdf',
  
  // SEO
  description: 'Full-Stack Developer specializing in MERN stack and PostgreSQL. Passionate about clean code, automation, and problem-solving.',
  keywords: [
    'Full-Stack Developer',
    'MERN Stack',
    'DevOps',
    'PostgreSQL',
    'React',
    'Node.js',
    'TypeScript',
  ],
}

export type SiteConfig = typeof siteConfig
