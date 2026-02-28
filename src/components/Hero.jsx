import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {

    return (
        <section className="hero">
            <div className="hero-bg-pattern"></div>
            <div className="container hero-inner">
                <div className="hero-grid">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="hero-content"
                    >
                        <div className="hero-badge">
                            <span className="badge-dot"></span>
                            Available for opportunities
                        </div>

                        <p className="hero-greeting">
                            👋 Hi, I'm Keshav
                        </p>

                        <h1 className="hero-name">
                            Keshav Sharma<span className="name-dash">--</span>
                        </h1>

                        <h2 className="hero-title">
                            <span className="title-word">Backend</span> <span className="title-word">Engineer</span><br />
                            <span className="title-word highlight">Bareilly</span> <span className="title-word highlight">India</span>
                        </h2>

                        <p className="hero-description">
                            Specializing in distributed microservices and event-driven architectures. Expert in building scalable systems that handle thousands of requests per second.
                        </p>

                        <div className="hero-actions">
                            <a 
                                href="https://drive.google.com/file/d/YOUR_RESUME_ID/view" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                VIEW RESUME
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="hero-visual"
                    >
                        <div className="hero-image-wrapper">
                            <img 
                                src="/customization-right.webp" 
                                alt="Developer Illustration" 
                                className="hero-illustration"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="scroll-indicator"
                >
                    <span>Scroll Down</span>
                    <div className="scroll-arrow"></div>
                </motion.div>
            </div>
        </section>
    );
}
