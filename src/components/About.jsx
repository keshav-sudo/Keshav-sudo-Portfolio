import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Code, Coffee, Heart, Zap } from 'lucide-react';
import './About.css';

const highlights = [
    {
        icon: Code,
        title: 'Microservices',
        description: '8+ microservice architectures with gRPC & event-driven messaging'
    },
    {
        icon: Zap,
        title: '40-65% Faster',
        description: 'Performance optimization through strategic database indexing'
    },
    {
        icon: Heart,
        title: 'Type-Safe APIs',
        description: 'Building robust systems with Protobuf, Zod, and Prisma'
    },
    {
        icon: Coffee,
        title: 'Scalable Systems',
        description: 'Kubernetes orchestration handling thousands of requests/sec'
    }
];

export default function About() {
    const [ref, inView] = useInView();

    return (
        <section id="about" className="section about-section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <div className="section-tag">About Me</div>
                    <h2 className="section-title">
                        Building Scalable <span className="grad-text">Systems</span>
                    </h2>
                    <p className="section-desc">
                        Backend engineer passionate about distributed architectures and high-performance systems
                    </p>
                </motion.div>

                <div className="about-content">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="about-image-wrapper"
                    >
                        <div className="about-image-container">
                            <img 
                                src="/customization-left.webp" 
                                alt="Profile" 
                                className="about-image"
                            />
                            <div className="image-backdrop"></div>
                        </div>
                        <div className="about-badge">
                            <span className="badge-emoji">�</span>
                            <div>
                                <div className="badge-title">Available for Work</div>
                                <div className="badge-subtitle">Bareilly, India</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="about-text"
                    >
                        <h3 className="about-heading">
                            About <span className="highlight-text">Me</span>
                        </h3>
                        
                        <div className="about-description">
                            <p>
                                Backend Engineer with a proven track record of optimizing system performance by 40-65% through strategic database design and architecture decisions.
                            </p>
                            <p>
                                I specialize in building distributed microservices using Go and Node.js, leveraging event-driven architectures with Kafka and RabbitMQ. My experience spans from designing type-safe gRPC APIs to orchestrating containerized systems with Kubernetes.
                            </p>
                            <p>
                                Currently pursuing B.Tech in Computer Science at Dr. A.P.J. Abdul Kalam Technical University while working on production systems that handle thousands of requests per second. I'm passionate about clean code, scalable architecture, and continuous learning.
                            </p>
                        </div>

                        <div className="about-highlights">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    className="highlight-card"
                                >
                                    <div className="highlight-icon">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="highlight-title">{item.title}</h4>
                                        <p className="highlight-desc">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
