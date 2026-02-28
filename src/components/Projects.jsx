import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useProjects } from '../context/ProjectContext';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Layers, X, ArrowUpRight, ArrowRight } from 'lucide-react';
import './Projects.css';

const colorMap = {
    purple: { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.18)' },
    cyan: { accent: '#06b6d4', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.18)' },
    pink: { accent: '#ec4899', bg: 'rgba(236,72,153,0.06)', border: 'rgba(236,72,153,0.18)' },
    emerald: { accent: '#10b981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.18)' },
    orange: { accent: '#f97316', bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.18)' },
};

function ExcalidrawModal({ url, onClose }) {
    const embedUrl = url.includes('excalidraw.com')
        ? url.replace('excalidraw.com/#', 'excalidraw.com/embed/#')
        : url;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="modal-box"
                onClick={e => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="modal-title"><Layers size={18} /> System Architecture</div>
                    <div className="modal-actions">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="modal-open-btn">
                            <ArrowUpRight size={16} /> Open in Excalidraw
                        </a>
                        <button onClick={onClose} className="modal-close"><X size={18} /></button>
                    </div>
                </div>
                <div className="modal-body">
                    <iframe src={embedUrl} title="Architecture Diagram" className="excalidraw-frame" allowFullScreen />
                </div>
            </motion.div>
        </motion.div>
    );
}

function ProjectCard({ project, index, inView }) {
    const [showArch, setShowArch] = useState(false);
    const c = colorMap[project.color] || colorMap.orange;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-card"
                style={{ '--card-accent': c.accent }}
            >
                <div className="card-top">
                    <div className="card-header">
                        <div>
                            <div className="project-date">{project.date}</div>
                            <h3 className="project-title">{project.title}</h3>
                            <div className="project-subtitle">{project.subtitle}</div>
                        </div>
                        <div className="card-links">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-link">
                                    <Github size={17} />
                                </a>
                            )}
                            {project.live && (
                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="icon-link">
                                    <ExternalLink size={17} />
                                </a>
                            )}
                        </div>
                    </div>

                    <p className="project-desc">{project.description}</p>

                    {project.highlights?.length > 0 && (
                        <ul className="project-highlights">
                            {project.highlights.map((h, i) => (
                                <li key={i} className="highlight-item">
                                    <span className="highlight-dot" />
                                    {h}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="card-footer">
                    <div className="project-tech">
                        {(project.tech || []).slice(0, 5).map(t => (
                            <span key={t} className="tech-pill">{t}</span>
                        ))}
                        {(project.tech || []).length > 5 && (
                            <span className="tech-pill">+{project.tech.length - 5}</span>
                        )}
                    </div>

                    <div className="card-actions">
                        {project.excalidraw && (
                            <button
                                className="arch-btn"
                                onClick={() => setShowArch(true)}
                            >
                                <Layers size={13} /> Architecture
                            </button>
                        )}
                        <Link to={`/project/${project.id}`} className="detail-btn">
                            <ArrowRight size={13} /> View Details
                        </Link>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {showArch && project.excalidraw && (
                    <ExcalidrawModal url={project.excalidraw} onClose={() => setShowArch(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

export default function Projects() {
    const [ref, inView] = useInView();
    const { projects } = useProjects();

    return (
        <section id="projects" className="section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <div className="section-tag">Featured Work</div>
                    <h2 className="section-title">
                        <span className="grad-text">Projects</span>
                    </h2>
                    <p className="section-desc">
                        Production-grade distributed systems — each with a full architecture you can explore.
                    </p>
                </motion.div>

                {projects.length === 0 ? (
                    <div className="no-projects">
                        No projects added yet. Add some from the admin panel!
                    </div>
                ) : (
                    <div className="projects-grid">
                        {projects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
