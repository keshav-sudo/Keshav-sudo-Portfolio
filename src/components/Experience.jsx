import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react';
import './Experience.css';

const experiences = [
    {
        company: 'Sheryians Pvt Ltd',
        role: 'Software Developer Intern',
        location: 'Bhopal, India',
        period: 'Nov 2025 – Present',
        color: 'purple',
        bullets: [
            'Leading backend migration for V3 Platform, achieving 40% faster API response times through optimized database indexing and query restructuring.',
            'Architected type-safe API layer handling 1,000+ daily requests with zero-downtime deployments and cross-service data consistency.',
            'Built interactive UI components with React and Framer Motion, improving user engagement metrics by 15%.',
        ],
        tags: ['TypeScript', 'Node.js', 'Prisma', 'React', 'Framer Motion'],
    },
    {
        company: 'ClinixSphere',
        role: 'Full Stack Developer Intern',
        location: 'Remote',
        period: 'Sep 2025 – Nov 2025',
        color: 'cyan',
        bullets: [
            'Redesigned v2 API architecture with Zod schema validation, reducing server-side errors by 25% and improving data integrity.',
            'Optimized PostgreSQL queries reducing execution time from 200ms to <80ms through query analysis and indexing strategies.',
            'Contributed 30+ merged PRs in Agile sprints, focusing on performance optimization and bug resolution.',
        ],
        tags: ['PostgreSQL', 'Zod', 'Node.js', 'REST API', 'Agile'],
    },
];

const colorMap = {
    purple: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', dot: '#8b5cf6' },
    cyan: { bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)', dot: '#06b6d4' },
};

export default function Experience() {
    const [ref, inView] = useInView();

    return (
        <section id="experience" className="section exp-section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <div className="section-tag">Work History</div>
                    <h2 className="section-title">
                        <span className="grad-text">Experience</span>
                    </h2>
                    <p className="section-desc">
                        Real-world impact across backend platforms and healthcare tech.
                    </p>
                </motion.div>

                <div className="exp-timeline">
                    {experiences.map((exp, i) => {
                        const c = colorMap[exp.color];
                        return (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="exp-card glass"
                            >
                                <div className="exp-dot" style={{ background: c.dot }} />
                                <div className="exp-body">
                                    <div className="exp-top">
                                        <div>
                                            <h3 className="exp-company">{exp.company}</h3>
                                            <div className="exp-role">{exp.role}</div>
                                        </div>
                                        <div className="exp-meta">
                                            <span className="exp-period">
                                                <Calendar size={13} /> {exp.period}
                                            </span>
                                            <span className="exp-location">
                                                <MapPin size={13} /> {exp.location}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="exp-bullets">
                                        {exp.bullets.map((b, bi) => (
                                            <li key={bi} className="exp-bullet">
                                                <ArrowRight size={14} className="bullet-icon" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="exp-tags">
                                        {exp.tags.map(t => (
                                            <span key={t} className="exp-tag" style={{ background: c.bg, borderColor: c.border }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Education */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="edu-card glass"
                >
                    <div className="edu-icon">🎓</div>
                    <div className="edu-body">
                        <h3>Dr. A.P.J. Abdul Kalam Technical University</h3>
                        <p>Bachelor of Technology in Computer Science</p>
                        <div className="edu-meta">
                            <span><MapPin size={13} /> Lucknow, India</span>
                            <span><Calendar size={13} /> 2023 – 2027</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
