import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Mail, MapPin, Send, Github, Linkedin, Phone } from 'lucide-react';
import './Contact.css';

export default function Contact() {
    const [ref, inView] = useInView();

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = 'mailto:thesharmakeshav@gmail.com';
    };

    return (
        <section id="contact" className="section contact-section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <div className="section-tag">Get In Touch</div>
                    <h2 className="section-title">
                        Let's Work <span className="grad-text">Together</span>
                    </h2>
                    <p className="section-desc">
                        Have a project in mind? Let's discuss how I can help bring your ideas to life.
                    </p>
                </motion.div>

                <div className="contact-content">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="contact-form-wrapper"
                    >
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        placeholder="Your name" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        placeholder="your@email.com" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    placeholder="What's this about?" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea 
                                    id="message" 
                                    rows={6} 
                                    placeholder="Tell me about your project..." 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary submit-btn">
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="contact-info"
                    >
                        <div className="info-card">
                            <h3 className="info-title">Contact Information</h3>
                            <p className="info-subtitle">Feel free to reach out through any of these channels</p>

                            <div className="info-items">
                                <a href="mailto:thesharmakeshav@gmail.com" className="info-item">
                                    <div className="info-icon">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div className="info-label">Email</div>
                                        <div className="info-value">thesharmakeshav@gmail.com</div>
                                    </div>
                                </a>

                                <a href="tel:+917830241468" className="info-item">
                                    <div className="info-icon">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <div className="info-label">Phone</div>
                                        <div className="info-value">+91 7830241468</div>
                                    </div>
                                </a>

                                <div className="info-item">
                                    <div className="info-icon">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <div className="info-label">Location</div>
                                        <div className="info-value">Bareilly, India</div>
                                    </div>
                                </div>
                            </div>

                            <div className="info-divider"></div>

                            <div className="social-links">
                                <p className="social-title">Connect With Me</p>
                                <div className="social-buttons">
                                    <a href="https://github.com/thesharmakeshav" target="_blank" rel="noopener noreferrer" className="social-btn">
                                        <Github size={20} />
                                        <span>GitHub</span>
                                    </a>
                                    <a href="https://www.linkedin.com/in/keshav-sharma-profile" target="_blank" rel="noopener noreferrer" className="social-btn">
                                        <Linkedin size={20} />
                                        <span>LinkedIn</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
