import { createContext, useContext, useState, useEffect } from 'react';

const defaultProjects = [
  {
    id: '1',
    title: 'VerifyDev',
    subtitle: 'Developer Verification Platform',
    description: 'Architected 8-microservice platform (Auth, User, Job, Recruiter, Chat, Resume, Aura-Processor, Analyzer) with gRPC communication and RabbitMQ event-driven messaging.',
    tech: ['Go', 'Node.js', 'gRPC', 'RabbitMQ', 'Prisma', 'React Native', 'Next.js', 'Socket.io'],
    github: 'https://github.com/keshav-sudo/',
    live: '',
    excalidrawScene: null,
    date: 'Dec 2025',
    highlights: ['65% faster queries via Prisma indexes', 'Real-time chat via Socket.io & gRPC streaming', 'GitHub repo analysis with tech stack detection'],
    color: 'purple',
  },
  {
    id: '2',
    title: 'SocialHub',
    subtitle: 'Event-Driven Social Platform',
    description: 'Designed 8-microservice architecture (Auth, Users, Posts, Feed, Chat, Notifications, VC, Gateway) processing 500+ msg/sec via Apache Kafka.',
    tech: ['Node.js', 'Kafka', 'Redis', 'LangChain', 'Kubernetes', 'Docker', 'Google GenAI'],
    github: 'https://github.com/keshav-sudo/',
    live: '',
    excalidrawScene: null,
    date: 'Aug 2025',
    highlights: ['500+ msg/sec via Apache Kafka', '60% DB load reduction with Redis caching', '99.9% uptime with Kubernetes orchestration'],
    color: 'cyan',
  },
  {
    id: '3',
    title: 'Kurser',
    subtitle: 'Cloud Deployment Platform',
    description: 'Engineered Vercel-like PaaS deploying React apps in <45 seconds using Nixpacks builds with BullMQ + Redis job queues.',
    tech: ['TypeScript', 'Azure', 'BullMQ', 'Redis', 'Mongoose', 'Nixpacks', 'GitHub Webhooks'],
    github: 'https://github.com/keshav-sudo/',
    live: '',
    excalidrawScene: null,
    date: 'Nov 2025',
    highlights: ['<45 second deployments', 'Azure Blob Storage CDN delivery', 'Automated CI/CD via GitHub webhooks'],
    color: 'pink',
  },
];

const ProjectContext = createContext(null);

function hydrateScenes(projects) {
  return projects.map(p => {
    try {
      const raw = localStorage.getItem(`ks_scene_${p.id}`);
      return raw ? { ...p, excalidrawScene: JSON.parse(raw) } : { ...p, excalidrawScene: p.excalidrawScene ?? null };
    } catch { return { ...p, excalidrawScene: null }; }
  });
}

function loadProjects() {
  try {
    const stored = localStorage.getItem('ks_projects');
    const base = stored ? JSON.parse(stored) : defaultProjects;
    return hydrateScenes(base);
  } catch { return hydrateScenes(defaultProjects); }
}

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(loadProjects);

  useEffect(() => {
    // Persist slim list (without large scene JSON)
    const slim = projects.map(({ excalidrawScene, ...rest }) => rest);
    try { localStorage.setItem('ks_projects', JSON.stringify(slim)); } catch { /* quota */ }
    // Persist each scene separately
    projects.forEach(p => {
      if (p.excalidrawScene) {
        try { localStorage.setItem(`ks_scene_${p.id}`, JSON.stringify(p.excalidrawScene)); } catch { /* quota */ }
      }
    });
  }, [projects]);

  const addProject = (project) => {
    setProjects(prev => [{ ...project, id: Date.now().toString(), excalidrawScene: null }, ...prev]);
  };

  const updateProject = (id, updates) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id) => {
    try { localStorage.removeItem(`ks_scene_${id}`); } catch { /* */ }
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);
