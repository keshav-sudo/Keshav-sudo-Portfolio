import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import './Skills.css';

const skillGroups = [
    {
        label: 'Languages',
        icon: '⚡',
        color: 'purple',
        skills: ['Go (Golang)', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'Protobuf'],
    },
    {
        label: 'Backend',
        icon: '🖥',
        color: 'cyan',
        skills: ['Node.js', 'Express.js', 'Gin (Go)', 'gRPC', 'REST APIs', 'WebSockets', 'Microservices'],
    },
    {
        label: 'Messaging & Caching',
        icon: '📨',
        color: 'pink',
        skills: ['Apache Kafka', 'RabbitMQ', 'Redis Pub-Sub', 'BullMQ', 'Redis Cache'],
    },
    {
        label: 'Databases',
        icon: '🗄',
        color: 'emerald',
        skills: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Mongoose', 'Redis'],
    },
    {
        label: 'DevOps & Cloud',
        icon: '☁️',
        color: 'orange',
        skills: ['Docker', 'Kubernetes', 'AWS EC2/S3', 'Azure Blob', 'CI/CD', 'Nginx'],
    },
    {
        label: 'Frontend',
        icon: '🎨',
        color: 'purple',
        skills: ['React.js', 'Next.js', 'React Native', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    },
];

const colorMap = {
    purple: 'rgba(249,115,22,0.07)',
    cyan: 'rgba(245,158,11,0.07)',
    pink: 'rgba(239,68,68,0.07)',
    emerald: 'rgba(16,185,129,0.07)',
    orange: 'rgba(249,115,22,0.07)',
};

const borderMap = {
    purple: 'rgba(249,115,22,0.2)',
    cyan: 'rgba(245,158,11,0.2)',
    pink: 'rgba(239,68,68,0.2)',
    emerald: 'rgba(16,185,129,0.2)',
    orange: 'rgba(249,115,22,0.2)',
};

export default function Skills() {
    const [ref, inView] = useInView();

    return (
        <section id="skills" className="section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <div className="section-tag">Technical Skills</div>
                    <h2 className="section-title">
                        My <span className="grad-text">Stack</span>
                    </h2>
                    <p className="section-desc">
                        Battle-tested across production distributed systems handling thousands of requests per second.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="skills-single-div glass"
                >
                    <div className="skills-content-wrapper">
                        {skillGroups.map((group) => (
                            <div key={group.label} className="skill-category">
                                <h3 className="skill-category-title">
                                    <span className="skill-category-icon">{group.icon}</span>
                                    {group.label}
                                </h3>
                                <div className="skill-tags">
                                    {group.skills.map(skill => (
                                        <span
                                            key={skill}
                                            className="skill-tag"
                                            style={{
                                                background: colorMap[group.color],
                                                borderColor: borderMap[group.color]
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
