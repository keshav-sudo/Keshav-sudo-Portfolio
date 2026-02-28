import { Github, Linkedin, Mail, Heart, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const social = [
    { icon: Github, href: 'https://github.com/thesharmakeshav', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/keshav-sharma-profile', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:thesharmakeshav@gmail.com', label: 'Email' },
];

export default function Footer() {
    const scrollToSection = (id) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="container footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <span className="footer-logo">Keshav Sharma<span className="footer-dot">.</span></span>
                        <p className="footer-tagline">Backend Engineer | Microservices Architect</p>
                    </div>
                    <nav className="footer-nav">
                        <button onClick={() => scrollToSection('#about')} className="footer-link">About</button>
                        <button onClick={() => scrollToSection('#projects')} className="footer-link">Projects</button>
                        <button onClick={() => scrollToSection('#contact')} className="footer-link">Contact</button>
                    </nav>
                    <div className="footer-social">
                        {social.map(({ icon: Icon, href, label }) => (
                            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="footer-social-link" title={label}>
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Keshav Sharma. Made with <Heart size={14} className="footer-heart" /> using React + Vite</span>
                    <Link to="/admin" className="footer-admin-btn">
                        <Lock size={14} /> Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
}
