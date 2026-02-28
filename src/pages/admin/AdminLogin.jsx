import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, LogIn } from 'lucide-react';
import './Admin.css';

export default function AdminLogin() {
    const { isAuthenticated, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        await new Promise(r => setTimeout(r, 800)); // small delay for UX
        const ok = login(email, password);
        if (!ok) setError('Invalid credentials. Please try again.');
        setLoading(false);
    };

    return (
        <div className="admin-login-page">
            <div className="login-bg">
                <div className="login-blob b1" />
                <div className="login-blob b2" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="login-card glass"
            >
                <div className="login-icon-wrap">
                    <Shield size={28} />
                </div>
                <h1 className="login-title">Admin Panel</h1>
                <p className="login-subtitle">Sign in to manage your portfolio</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="thesharmakeshav@gmail.com"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="login-field">
                        <label>Password</label>
                        <div className="pw-wrap">
                            <input
                                type={showPw ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••"
                                required
                                autoComplete="current-password"
                            />
                            <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)}>
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="login-error"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button type="submit" className="login-btn btn btn-primary" disabled={loading}>
                        {loading ? (
                            <span className="spinner" />
                        ) : (
                            <><LogIn size={16} /> Sign In</>
                        )}
                    </button>
                </form>

                <a href="/" className="back-link">← Back to Portfolio</a>
            </motion.div>
        </div>
    );
}
