import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import ExcalidrawViewer from '../components/ExcalidrawViewer';
import {
    ArrowLeft, Github, ExternalLink, Layers, Upload,
    X, Check, AlertCircle, ArrowUpRight, Server, Code2,
    Calendar, Zap, ChevronRight, Maximize2, Link2,
} from 'lucide-react';
import './ProjectDetail.css';

/* ── Excalidraw import panel (admin only) ─────────────────────── */
function ImportPanel({ project, onSave }) {
    const [tab, setTab] = useState('file'); // 'file' | 'json'
    const [status, setStatus] = useState(null);
    const [msg, setMsg] = useState('');
    const [jsonText, setJsonText] = useState('');
    const fileRef = useRef(null);

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.name.endsWith('.excalidraw') && !file.name.endsWith('.json')) {
            setStatus('error'); setMsg('Please upload a .excalidraw or .json file'); return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const parsed = JSON.parse(ev.target.result);
                onSave(parsed);
                setStatus('success'); setMsg('Diagram imported successfully!');
            } catch {
                setStatus('error'); setMsg('Could not parse file — make sure it\'s a valid .excalidraw file');
            }
        };
        reader.readAsText(file);
    };

    const handleJsonSave = () => {
        try {
            const parsed = JSON.parse(jsonText);
            onSave(parsed);
            setStatus('success'); setMsg('Diagram saved!');
        } catch {
            setStatus('error'); setMsg('Invalid JSON — paste the raw .excalidraw file contents');
        }
    };

    return (
        <div className="import-panel">
            <div className="import-panel-header">
                <h3 className="import-title"><Layers size={16} /> Import Architecture Diagram</h3>
                <p className="import-hint">Upload your <code>.excalidraw</code> file and it renders directly in the page — no external link needed.</p>
            </div>

            <div className="import-tabs">
                <button className={`itab ${tab === 'file' ? 'active' : ''}`} onClick={() => setTab('file')}>
                    <Upload size={13} /> Upload File
                </button>
                <button className={`itab ${tab === 'json' ? 'active' : ''}`} onClick={() => setTab('json')}>
                    <Link2 size={13} /> Paste JSON
                </button>
            </div>

            {tab === 'file' && (
                <div
                    className="dropzone"
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFile({ target: { files: [file] } });
                    }}
                >
                    <input ref={fileRef} type="file" accept=".excalidraw,.json" onChange={handleFile} style={{ display: 'none' }} />
                    <div className="dz-icon"><Upload size={28} /></div>
                    <p className="dz-label">Drop your <strong>.excalidraw</strong> file here</p>
                    <span className="dz-sub">or click to browse</span>
                </div>
            )}

            {tab === 'json' && (
                <div className="json-tab">
                    <p className="json-hint">In Excalidraw: <strong>Menu → Save as → .excalidraw</strong>, then paste the file contents below:</p>
                    <textarea
                        className="json-textarea"
                        rows={6}
                        placeholder={'{\n  "type": "excalidraw",\n  "elements": [...],\n  ...\n}'}
                        value={jsonText}
                        onChange={e => setJsonText(e.target.value)}
                    />
                    <button className="btn btn-primary" style={{ alignSelf: 'flex-start', fontSize: '13px', padding: '9px 20px' }} onClick={handleJsonSave}>
                        <Check size={14} /> Save Diagram
                    </button>
                </div>
            )}

            {status && (
                <div className={`import-status ${status}`}>
                    {status === 'success' ? <Check size={14} /> : <AlertCircle size={14} />}
                    {msg}
                    {status === 'success' && (
                        <button className="status-dismiss" onClick={() => setStatus(null)}><X size={12} /></button>
                    )}
                </div>
            )}
        </div>
    );
}

/* ── Main page ──────────────────────────────────────────────────── */
export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects, updateProject } = useProjects();
    const { isAuthenticated } = useAuth();
    const [fullscreen, setFullscreen] = useState(false);

    const project = projects.find(p => p.id === id);

    if (!project) {
        return (
            <div className="pd-not-found">
                <div className="nf-emoji">🔍</div>
                <h2>Project not found</h2>
                <button className="btn btn-primary" onClick={() => navigate('/')}>← Go Home</button>
            </div>
        );
    }

    const saveScene = (sceneData) => {
        updateProject(project.id, { excalidrawScene: sceneData });
    };

    const hasArch = !!project.excalidrawScene;
    const [isEditingArch, setIsEditingArch] = useState(false);

    return (
        <div className="pd-page">
            {/* ── Topbar ── */}
            <header className="pd-topbar">
                <div className="pd-topbar-inner">
                    <button className="pd-back" onClick={() => navigate(-1)}>
                        <ArrowLeft size={15} /> Back to Projects
                    </button>
                    <div className="pd-topbar-links">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline pd-hdr-btn">
                                <Github size={14} /> GitHub
                            </a>
                        )}
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary pd-hdr-btn">
                                <ExternalLink size={13} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <main className="pd-main container">

                {/* ── Hero banner ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="pd-banner"
                >
                    <span className="pd-date-pill"><Calendar size={12} /> {project.date}</span>
                    <h1 className="pd-title">{project.title}</h1>
                    {project.subtitle && <p className="pd-subtitle">{project.subtitle}</p>}
                    {project.tech?.length > 0 && (
                        <div className="pd-tech-row">
                            {project.tech.map(t => <span key={t} className="pd-tc">{t}</span>)}
                        </div>
                    )}
                </motion.div>

                <div className="pd-grid">
                    {/* ── Left column ── */}
                    <div className="pd-col">

                        {/* Overview */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="pd-card"
                        >
                            <div className="pdc-head"><Code2 size={16} /> Overview</div>
                            <p className="pd-body-text">{project.description}</p>
                        </motion.div>

                        {/* Achievements */}
                        {project.highlights?.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.14 }}
                                className="pd-card"
                            >
                                <div className="pdc-head"><Zap size={16} /> Key Achievements</div>
                                <ul className="pd-hl-list">
                                    {project.highlights.map((h, i) => (
                                        <li key={i} className="pd-hl-item">
                                            <span className="pd-hl-num">{String(i + 1).padStart(2, '0')}</span>
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* Tech stack */}
                        {project.tech?.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18 }}
                                className="pd-card"
                            >
                                <div className="pdc-head"><Server size={16} /> Tech Stack</div>
                                <div className="pd-stack-grid">
                                    {project.tech.map(t => (
                                        <div key={t} className="pd-stack-chip">
                                            <ChevronRight size={11} /> {t}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* ── Right column ── */}
                    <div className="pd-col">

                        {/* Architecture viewer */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12 }}
                            className="pd-card pd-arch-card"
                        >
                            <div className="pdc-head-row">
                                <div className="pdc-head"><Layers size={16} /> System Architecture</div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {isAuthenticated && (
                                        <button className="expand-btn" onClick={() => setIsEditingArch(!isEditingArch)}>
                                            <Upload size={14} /> {hasArch ? 'Edit' : 'Add'}
                                        </button>
                                    )}
                                    {hasArch && (
                                        <button className="expand-btn" onClick={() => setFullscreen(true)}>
                                            <Maximize2 size={14} /> Fullscreen
                                        </button>
                                    )}
                                </div>
                            </div>

                            {hasArch ? (
                                <div className="arch-canvas" onClick={() => setFullscreen(true)}>
                                    <ExcalidrawViewer sceneData={project.excalidrawScene} height={340} />
                                    <div className="arch-canvas-overlay">
                                        <span className="arch-zoom-hint"><Maximize2 size={14} /> Click to view fullscreen</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="arch-placeholder">
                                    <Layers size={40} className="ph-icon" />
                                    <p className="ph-title">No diagram yet</p>
                                    <p className="ph-desc">
                                        Architecture diagram coming soon.
                                    </p>
                                </div>
                            )}
                        </motion.div>

                        {/* Import panel — admin only */}
                        <AnimatePresence>
                            {isAuthenticated && isEditingArch && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{ paddingTop: '8px' }}>
                                        <ImportPanel project={project} onSave={saveScene} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </main>

            {/* ── Fullscreen modal ── */}
            <AnimatePresence>
                {fullscreen && hasArch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fs-overlay"
                        onClick={() => setFullscreen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.96 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.96 }}
                            className="fs-modal"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="fs-header">
                                <span className="fs-title"><Layers size={16} /> {project.title} — Architecture</span>
                                <button className="fs-close" onClick={() => setFullscreen(false)}><X size={18} /></button>
                            </div>
                            <div className="fs-body">
                                <ExcalidrawViewer sceneData={project.excalidrawScene} height={window.innerHeight - 120} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
