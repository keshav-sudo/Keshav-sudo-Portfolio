import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import { Navigate, Link } from 'react-router-dom';
import {
    LogOut, Plus, Pencil, Trash2, ExternalLink, Github,
    Layers, Eye, X, LayoutDashboard, Save, Upload, Check, AlertCircle, Link2
} from 'lucide-react';
import './Admin.css';

const EMPTY_PROJECT = {
    title: '',
    subtitle: '',
    description: '',
    tech: '',
    github: '',
    live: '',
    excalidraw: '',
    excalidrawScene: null,
    date: '',
    highlights: '',
    color: 'purple',
};

const COLORS = ['purple', 'cyan', 'pink', 'emerald', 'orange'];

function ProjectForm({ initial, onSave, onCancel }) {
    const [form, setForm] = useState(initial);
    const [uploadStatus, setUploadStatus] = useState(null);
    const fileRef = useRef(null);

    const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.name.endsWith('.excalidraw') && !file.name.endsWith('.json')) {
            setUploadStatus({ type: 'error', msg: 'Please upload a .excalidraw or .json file' });
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const parsed = JSON.parse(ev.target.result);
                set('excalidrawScene', parsed);
                setUploadStatus({ type: 'success', msg: `✓ ${file.name} uploaded successfully!` });
                setTimeout(() => setUploadStatus(null), 3000);
            } catch {
                setUploadStatus({ type: 'error', msg: 'Invalid JSON file' });
            }
        };
        reader.readAsText(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const project = {
            ...form,
            tech: form.tech ? form.tech.split(',').map(t => t.trim()).filter(Boolean) : [],
            highlights: form.highlights ? form.highlights.split('\n').map(h => h.trim()).filter(Boolean) : [],
        };
        onSave(project);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="project-form-wrap"
        >
            <form className="project-form glass" onSubmit={handleSubmit}>
                <div className="form-title">
                    {initial.title ? `Edit: ${initial.title}` : 'Add New Project'}
                </div>

                <div className="form-2col">
                    <div className="f-group">
                        <label>Title *</label>
                        <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. SocialHub" required />
                    </div>
                    <div className="f-group">
                        <label>Subtitle</label>
                        <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="Event-Driven Social Platform" />
                    </div>
                </div>

                <div className="f-group">
                    <label>Description *</label>
                    <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Designed 8-microservice architecture..." required />
                </div>

                <div className="f-group">
                    <label>Tech Stack (comma-separated)</label>
                    <input value={form.tech} onChange={e => set('tech', e.target.value)} placeholder="Node.js, Kafka, Redis, Docker, Kubernetes" />
                </div>

                <div className="f-group">
                    <label>Highlights (one per line)</label>
                    <textarea rows={3} value={form.highlights} onChange={e => set('highlights', e.target.value)} placeholder="500+ msg/sec via Kafka&#10;60% DB load reduction&#10;99.9% uptime" />
                </div>

                <div className="form-2col">
                    <div className="f-group">
                        <label>GitHub URL</label>
                        <input value={form.github} onChange={e => set('github', e.target.value)} placeholder="https://github.com/..." />
                    </div>
                    <div className="f-group">
                        <label>Live URL</label>
                        <input value={form.live} onChange={e => set('live', e.target.value)} placeholder="https://..." />
                    </div>
                </div>

                {/* Architecture Diagram Section - Prominent */}
                <div className="f-group arch-section">
                    <div className="arch-section-header">
                        <Layers size={18} />
                        <label>Architecture Diagram</label>
                    </div>
                    <p className="arch-hint">
                        Upload your <code>.excalidraw</code> file for an interactive diagram, or paste a share link below.
                    </p>
                    
                    {/* File Upload */}
                    <div className="arch-upload-area">
                        <input 
                            ref={fileRef} 
                            type="file" 
                            accept=".excalidraw,.json" 
                            onChange={handleFileUpload} 
                            style={{ display: 'none' }} 
                        />
                        <button 
                            type="button" 
                            className="upload-btn"
                            onClick={() => fileRef.current?.click()}
                        >
                            <Upload size={16} /> Upload .excalidraw File
                        </button>
                        {form.excalidrawScene && (
                            <span className="upload-success">
                                <Check size={14} /> JSON uploaded
                            </span>
                        )}
                    </div>

                    {uploadStatus && (
                        <div className={`upload-status ${uploadStatus.type}`}>
                            {uploadStatus.type === 'success' ? <Check size={14} /> : <AlertCircle size={14} />}
                            {uploadStatus.msg}
                        </div>
                    )}

                    {/* OR Divider */}
                    <div className="or-divider">
                        <span>OR</span>
                    </div>

                    {/* URL Input */}
                    <div className="f-group">
                        <label><Link2 size={14} /> Excalidraw Share Link</label>
                        <input
                            value={form.excalidraw}
                            onChange={e => set('excalidraw', e.target.value)}
                            placeholder="https://excalidraw.com/#json=... or share link"
                        />
                        <span className="f-hint-small">Paste your Excalidraw share link as an alternative to file upload.</span>
                    </div>
                </div>

                <div className="form-2col">
                    <div className="f-group">
                        <label>Date</label>
                        <input value={form.date} onChange={e => set('date', e.target.value)} placeholder="Jan 2025" />
                    </div>
                    <div className="f-group">
                        <label>Card Color</label>
                        <div className="color-picker">
                            {COLORS.map(c => (
                                <button
                                    key={c}
                                    type="button"
                                    className={`color-dot color-${c} ${form.color === c ? 'active' : ''}`}
                                    onClick={() => set('color', c)}
                                    title={c}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        <Save size={16} /> Save Project
                    </button>
                </div>
            </form>
        </motion.div>
    );
}

export default function AdminDashboard() {
    const { isAuthenticated, logout } = useAuth();
    const { projects, addProject, updateProject, deleteProject } = useProjects();
    const [mode, setMode] = useState('list'); // 'list' | 'add' | 'edit'
    const [editProject, setEditProject] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    if (!isAuthenticated) return <Navigate to="/admin" replace />;

    const handleSave = (data) => {
        if (mode === 'edit' && editProject) {
            updateProject(editProject.id, data);
        } else {
            addProject(data);
        }
        setMode('list');
        setEditProject(null);
    };

    const startEdit = (project) => {
        setEditProject({
            ...project,
            tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech,
            highlights: Array.isArray(project.highlights) ? project.highlights.join('\n') : project.highlights,
        });
        setMode('edit');
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header glass">
                <div className="admin-header-inner">
                    <div className="admin-logo">
                        <LayoutDashboard size={20} />
                        <span>Portfolio Admin</span>
                    </div>
                    <div className="admin-header-actions">
                        <Link to="/" className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '13px' }}>
                            <Eye size={14} /> View Portfolio
                        </Link>
                        <button onClick={logout} className="btn btn-outline logout-btn">
                            <LogOut size={14} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="admin-main">
                {/* Stats */}
                <div className="admin-stats">
                    {[
                        { label: 'Total Projects', val: projects.length, icon: '🚀' },
                        { label: 'Architecture Diagrams', val: projects.filter(p => p.excalidraw).length, icon: '🏗' },
                        { label: 'Live Projects', val: projects.filter(p => p.live).length, icon: '🌐' },
                    ].map(s => (
                        <div key={s.label} className="admin-stat glass">
                            <span className="as-icon">{s.icon}</span>
                            <div>
                                <div className="as-val">{s.val}</div>
                                <div className="as-label">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {(mode === 'add' || mode === 'edit') ? (
                    <ProjectForm
                        initial={mode === 'edit' ? editProject : EMPTY_PROJECT}
                        onSave={handleSave}
                        onCancel={() => { setMode('list'); setEditProject(null); }}
                    />
                ) : (
                    <div className="projects-panel">
                        <div className="panel-header">
                            <h2 className="panel-title">Projects</h2>
                            <button className="btn btn-primary" onClick={() => setMode('add')}>
                                <Plus size={16} /> Add Project
                            </button>
                        </div>

                        {projects.length === 0 ? (
                            <div className="empty-state glass">
                                <span className="empty-icon">🚀</span>
                                <p>No projects yet. Add your first project!</p>
                                <button className="btn btn-primary" onClick={() => setMode('add')}>
                                    <Plus size={16} /> Add Project
                                </button>
                            </div>
                        ) : (
                            <div className="admin-projects-list">
                                {projects.map((project, i) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="admin-project-row glass"
                                    >
                                        <div className="apr-info">
                                            <div className="apr-title">{project.title}</div>
                                            <div className="apr-subtitle">{project.subtitle}</div>
                                            <div className="apr-tech">
                                                {(project.tech || []).slice(0, 4).map(t => (
                                                    <span key={t} className="apr-tag">{t}</span>
                                                ))}
                                                {(project.tech || []).length > 4 && (
                                                    <span className="apr-tag">+{project.tech.length - 4}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="apr-badges">
                                            {project.excalidraw && (
                                                <span className="apr-badge arch">
                                                    <Layers size={12} /> Arch
                                                </span>
                                            )}
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="apr-badge github">
                                                    <Github size={12} /> GitHub
                                                </a>
                                            )}
                                            {project.live && (
                                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="apr-badge live">
                                                    <ExternalLink size={12} /> Live
                                                </a>
                                            )}
                                        </div>

                                        <div className="apr-actions">
                                            <button className="icon-btn edit" onClick={() => startEdit(project)} title="Edit">
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                className="icon-btn delete"
                                                onClick={() => setDeleteConfirm(project.id)}
                                                title="Delete"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Delete Confirm */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                        onClick={() => setDeleteConfirm(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="confirm-dialog glass"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3>Delete Project?</h3>
                            <p>This action cannot be undone.</p>
                            <div className="confirm-actions">
                                <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => { deleteProject(deleteConfirm); setDeleteConfirm(null); }}
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
