import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import {
    Github, Star, GitFork, Users, BookOpen,
    GitPullRequest, GitCommit, GitBranch, ExternalLink,
    Code2, Zap, Calendar
} from 'lucide-react';
import './GitHub.css';

const USERNAME = 'keshav-sudo';
const BASE = 'https://api.github.com';

/* Language colours matching GitHub's palette */
const LANG_COLOR = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Go: '#00add8',
    'C++': '#f34b7d',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
};

function SkeletonCard({ h = 120 }) {
    return (
        <div className="gh-skeleton" style={{ height: h }}>
            <div className="sk-line" />
            <div className="sk-line short" />
        </div>
    );
}

function StatBadge({ icon: Icon, value, label }) {
    return (
        <div className="gh-stat-badge">
            <Icon size={16} className="gh-stat-icon" />
            <span className="gh-stat-val">{value}</span>
            <span className="gh-stat-lbl">{label}</span>
        </div>
    );
}

function LangBar({ langs }) {
    if (!langs || Object.keys(langs).length === 0) return null;
    const total = Object.values(langs).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(langs)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 7);

    return (
        <div className="gh-lang-section">
            <div className="gh-section-label"><Code2 size={13} /> Languages</div>
            <div className="gh-lang-bar">
                {sorted.map(([lang, bytes]) => (
                    <div
                        key={lang}
                        className="gh-lang-segment"
                        style={{
                            width: `${(bytes / total) * 100}%`,
                            background: LANG_COLOR[lang] || '#94a3b8',
                        }}
                        title={`${lang}: ${((bytes / total) * 100).toFixed(1)}%`}
                    />
                ))}
            </div>
            <div className="gh-lang-legend">
                {sorted.map(([lang, bytes]) => (
                    <div key={lang} className="gh-lang-item">
                        <span className="gh-lang-dot" style={{ background: LANG_COLOR[lang] || '#94a3b8' }} />
                        <span className="gh-lang-name">{lang}</span>
                        <span className="gh-lang-pct">{((bytes / total) * 100).toFixed(1)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RepoCard({ repo }) {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-repo-card"
        >
            <div className="gh-repo-header">
                <BookOpen size={13} className="gh-repo-icon" />
                <span className="gh-repo-name">{repo.name}</span>
                <ExternalLink size={11} className="gh-repo-ext" />
            </div>
            {repo.description && (
                <p className="gh-repo-desc">{repo.description}</p>
            )}
            <div className="gh-repo-footer">
                {repo.language && (
                    <span className="gh-repo-lang">
                        <span className="gh-lang-dot sm" style={{ background: LANG_COLOR[repo.language] || '#94a3b8' }} />
                        {repo.language}
                    </span>
                )}
                <span className="gh-repo-stars"><Star size={11} /> {repo.stargazers_count}</span>
                <span className="gh-repo-forks"><GitFork size={11} /> {repo.forks_count}</span>
            </div>
        </a>
    );
}

function ActivityItem({ event }) {
    const ago = (dateStr) => {
        const diff = (Date.now() - new Date(dateStr)) / 1000;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    const iconMap = {
        PushEvent: <GitCommit size={13} />,
        PullRequestEvent: <GitPullRequest size={13} />,
        CreateEvent: <GitBranch size={13} />,
        ForkEvent: <GitFork size={13} />,
    };

    const labelMap = {
        PushEvent: 'Pushed to',
        PullRequestEvent: (e) => `PR #${e.payload?.number} ${e.payload?.action}`,
        CreateEvent: 'Created branch in',
        ForkEvent: 'Forked',
    };

    const label = typeof labelMap[event.type] === 'function'
        ? labelMap[event.type](event)
        : (labelMap[event.type] || event.type.replace('Event', ''));

    const repoName = event.repo.name.split('/')[1];
    const repoUrl = `https://github.com/${event.repo.name}`;

    return (
        <div className="gh-activity-item">
            <div className={`gh-act-dot ${event.type === 'PullRequestEvent' ? 'pr' : ''}`}>
                {iconMap[event.type] || <Zap size={13} />}
            </div>
            <div className="gh-act-body">
                <span className="gh-act-label">{label}</span>{' '}
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="gh-act-repo">
                    {repoName}
                </a>
            </div>
            <span className="gh-act-time">{ago(event.created_at)}</span>
        </div>
    );
}

export default function GitHub() {
    const [ref, inView] = useInView();
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [events, setEvents] = useState([]);
    const [langs, setLangs] = useState({});
    const [loading, setLoading] = useState(true);
    const [totalStars, setTotalStars] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let cancelled = false;

        const headers = { 'User-Agent': 'portfolio-site' };

        async function load() {
            try {
                const [profileRes, reposRes, eventsRes] = await Promise.all([
                    fetch(`${BASE}/users/${USERNAME}`, { headers }),
                    fetch(`${BASE}/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers }),
                    fetch(`${BASE}/users/${USERNAME}/events/public?per_page=30`, { headers }),
                ]);

                const [profileData, reposData, eventsData] = await Promise.all([
                    profileRes.json(),
                    reposRes.json(),
                    eventsRes.json(),
                ]);

                if (cancelled) return;

                setProfile(profileData);

                const ownRepos = reposData.filter(r => !r.fork);
                setRepos(ownRepos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6));
                setTotalStars(reposData.reduce((s, r) => s + r.stargazers_count, 0));

                // Meaningful events only
                const meaningful = eventsData.filter(e =>
                    ['PushEvent', 'PullRequestEvent', 'CreateEvent', 'ForkEvent'].includes(e.type)
                ).slice(0, 8);
                setEvents(meaningful);

                // Aggregate language bytes from top repos (non-fork, has language)
                const langRepos = ownRepos.filter(r => r.language).slice(0, 15);
                const langTotals = {};
                langRepos.forEach(r => {
                    if (r.language) langTotals[r.language] = (langTotals[r.language] || 0) + r.size;
                });
                setLangs(langTotals);

            } catch (err) {
                console.error('GitHub section error:', err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, [inView]);

    const prCount = events.filter(e => e.type === 'PullRequestEvent').length;
    const pushCount = events.filter(e => e.type === 'PushEvent').length;

    return (
        <section id="github" className="section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <div className="section-tag">Open Source</div>
                    <h2 className="section-title">
                        <span className="grad-text">GitHub</span> Activity
                    </h2>
                    <p className="section-desc">
                        Live stats pulled from the GitHub API — commits, PRs, repos, and language usage.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="gh-loading-grid">
                        <SkeletonCard h={140} />
                        <SkeletonCard h={140} />
                        <SkeletonCard h={140} />
                    </div>
                ) : (
                    <>
                        {/* ── Profile + Stats row ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 }}
                            className="gh-profile-card"
                        >
                            <div className="gh-profile-left">
                                <img
                                    src={profile?.avatar_url}
                                    alt={profile?.name}
                                    className="gh-avatar"
                                />
                                <div>
                                    <div className="gh-name">{profile?.name || USERNAME}</div>
                                    <a
                                        href={`https://github.com/${USERNAME}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gh-handle"
                                    >
                                        <Github size={13} /> @{USERNAME}
                                    </a>
                                    {profile?.bio && <p className="gh-bio">{profile.bio}</p>}
                                </div>
                            </div>

                            <div className="gh-stats-row">
                                <StatBadge icon={BookOpen} value={profile?.public_repos} label="Repos" />
                                <StatBadge icon={Users} value={profile?.followers} label="Followers" />
                                <StatBadge icon={Star} value={totalStars} label="Stars" />
                                <StatBadge icon={GitPullRequest} value={prCount + '+'} label="PRs" />
                                <StatBadge icon={GitCommit} value={pushCount + '+'} label="Pushes" />
                            </div>
                        </motion.div>

                        {/* ── Contribution graph ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 }}
                            className="gh-contrib-card"
                        >
                            <div className="gh-card-head"><Calendar size={14} /> Contribution Graph</div>
                            <div className="gh-contrib-wrap">
                                <img
                                    src={`https://ghchart.rshah.org/f97316/${USERNAME}`}
                                    alt="GitHub contribution chart"
                                    className="gh-contrib-img"
                                    loading="lazy"
                                />
                            </div>
                            <a
                                href={`https://github.com/${USERNAME}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gh-view-all"
                            >
                                View on GitHub <ExternalLink size={12} />
                            </a>
                        </motion.div>

                        {/* ── Languages + Activity ── */}
                        <div className="gh-two-col">
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.18 }}
                                className="gh-card"
                            >
                                <LangBar langs={langs} />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 }}
                                className="gh-card"
                            >
                                <div className="gh-section-label"><Zap size={13} /> Recent Activity</div>
                                <div className="gh-activity-feed">
                                    {events.length > 0
                                        ? events.map(e => <ActivityItem key={e.id} event={e} />)
                                        : <p className="gh-empty">No recent public activity.</p>
                                    }
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Top Repos ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.22 }}
                        >
                            <div className="gh-section-label mt"><Star size={13} /> Top Repositories</div>
                            <div className="gh-repos-grid">
                                {repos.map(r => <RepoCard key={r.id} repo={r} />)}
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
}
