import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    ExternalLink, Code, Server,
    Globe, ChevronRight, X, Eye
} from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    features: string[];
    liveUrl?: string;
    category: string;
}

const Projects = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState('all');

    const projects: Project[] = [
        {
            id: 1,
            title: 'Smart Contracts on Ethereum',
            description: 'Team project building auction smart contracts in Solidity',
            longDescription: 'Developed Ethereum smart contracts for auction management in a team of 6 members. Implemented bidding logic, transaction validation, and state control with testing on SepoliaETH.',
            technologies: ['Solidity', 'Ethereum', 'SepoliaETH', 'Blockchain Security'],
            features: [
                'Auction logic with bid validation',
                'Transaction flow and state management',
                'Deployment and testing in Ethereum environments',
                'Applied cryptography and blockchain security concepts',
            ],
            category: 'backend',
        },
        {
            id: 2,
            title: 'ColdSkin - Unity Game',
            description: 'Team-developed video game in Unity and C#',
            longDescription: 'Collaborative game project completed by a team of 4. Focused on gameplay systems, scene interaction, physics, and integration of assets, animations, and UI components in Unity.',
            technologies: ['Unity', 'C#', 'Game Physics', 'UI Integration'],
            features: [
                'Gameplay mechanics and character control',
                'Scene design and environment interaction',
                'Integration of assets, animations, and UI',
                'Team collaboration in a complete game pipeline',
            ],
            category: 'frontend',
        },
        {
            id: 3,
            title: 'Pacman Intelligent Agent',
            description: 'AI agent project based on Berkeley Pacman',
            longDescription: 'Built an autonomous Pacman agent in a team of 2 using Artificial Intelligence techniques and search strategies for real-time decision making.',
            technologies: ['Python', 'AI', 'DFS', 'BFS', 'A*', 'Minimax'],
            features: [
                'Implemented DFS, BFS, A*, and Minimax with alpha-beta pruning',
                'Designed heuristics for real-time decisions',
                'Evaluated performance across different scenarios',
                'Improved agent behavior under increasing complexity',
            ],
            category: 'backend',
        },
        {
            id: 4,
            title: 'Basic OpenGL Graphics Engine',
            description: 'Custom rendering pipeline built with OpenGL in C++',
            longDescription: 'Developed a graphics project with OpenGL and GLSL 1.20 including shader programming, 3D camera setup, and advanced lighting support.',
            technologies: ['C++', 'OpenGL', 'GLSL', '3D Math'],
            features: [
                'Implemented a rendering pipeline',
                'Developed custom vertex and fragment shaders',
                'Implemented 3D perspective camera frustum',
                'Applied model, view, and projection transformations',
            ],
            category: 'frontend',
        },
        {
            id: 5,
            title: 'Self-Managed Minecraft Server',
            description: 'Virtualized Linux server deployment and management project',
            longDescription: 'Configured and maintained a Minecraft server on Ubuntu running in a Proxmox virtualized environment. Covered performance, compatibility, and security aspects.',
            technologies: ['Linux', 'Ubuntu', 'Proxmox', 'Java', 'Server Security'],
            features: [
                'Server setup and plugin configuration',
                'Authentication and version compatibility management',
                'Troubleshooting Java runtime compatibility issues',
                'Performance and memory optimization with security hardening',
            ],
            category: 'backend',
        },
    ];

    const categories = [
        { id: 'all', label: 'all', icon: <Code className="w-4 h-4" /> },
        { id: 'fullstack', label: 'fullstack', icon: <Globe className="w-4 h-4" /> },
        { id: 'backend', label: 'backend', icon: <Server className="w-4 h-4" /> },
        { id: 'frontend', label: 'frontend', icon: <Code className="w-4 h-4" /> },
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative" ref={ref}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                className="max-w-6xl mx-auto"
            >
                {/* Terminal Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2 mb-4 font-mono text-sm">
                        <span className="text-terminal-green">➜</span>
                        <span className="text-terminal-cyan">~/portfolio</span>
                        <span className="text-white">git log --oneline --all --graph</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-px flex-grow bg-gradient-to-r from-terminal-green/50 to-transparent" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-terminal-green flex items-center gap-3">
                            <span className="text-terminal-dim">{'//'}</span>
                            PROJECTS
                            <span className="animate-pulse">_</span>
                        </h2>
                        <div className="h-px flex-grow bg-gradient-to-l from-terminal-green/50 to-transparent" />
                    </div>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-8 font-mono"
                >
                    <span className="text-terminal-dim text-sm self-center mr-2">filter:</span>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-4 py-2 rounded-lg border text-sm flex items-center gap-2 transition-all duration-200 ${filter === cat.id
                                ? 'bg-terminal-green/20 border-terminal-green text-terminal-green shadow-terminal'
                                : 'bg-terminal-dark border-terminal-dim/30 text-terminal-dim hover:border-terminal-green/50 hover:text-terminal-green'
                                }`}
                        >
                            {cat.icon}
                            --{cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="wait">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.1 }}
                                className="terminal-window group cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="terminal-header">
                                    <div className="terminal-btn terminal-btn-close" />
                                    <div className="terminal-btn terminal-btn-minimize" />
                                    <div className="terminal-btn terminal-btn-maximize" />
                                    <span className="ml-4 text-terminal-dim text-xs font-mono">
                                        project_{project.id}.sh
                                    </span>
                                </div>

                                <div className="p-6">
                                    {/* Project header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className="text-terminal-amber text-xs font-mono mb-2 block">
                                                #{project.category.toUpperCase()}
                                            </span>
                                            <h3 className="text-xl font-bold text-terminal-green font-mono group-hover:glow-text-sm transition-all">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <Eye className="w-5 h-5 text-terminal-dim group-hover:text-terminal-green transition-colors" />
                                    </div>

                                    {/* Description */}
                                    <p className="text-terminal-dim text-sm font-mono mb-4 leading-relaxed">
                                        <span className="text-terminal-cyan">$ echo</span> "{project.description}"
                                    </p>

                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-terminal-green/10 border border-terminal-green/20 rounded text-xs font-mono text-terminal-green"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className="px-2 py-1 text-xs font-mono text-terminal-dim">
                                                +{project.technologies.length - 4} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-3 pt-4 border-t border-terminal-green/20">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-2 text-sm text-terminal-dim hover:text-terminal-cyan font-mono transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Project Detail Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
                                onClick={() => setSelectedProject(null)}
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50 overflow-auto max-h-[90vh]"
                            >
                                <div className="terminal-window">
                                    <div className="terminal-header sticky top-0 z-10">
                                        <div className="terminal-btn terminal-btn-close" onClick={() => setSelectedProject(null)} />
                                        <div className="terminal-btn terminal-btn-minimize" />
                                        <div className="terminal-btn terminal-btn-maximize" />
                                        <span className="ml-4 text-terminal-dim text-xs font-mono">
                                            {selectedProject.title.toLowerCase().replace(/\s+/g, '_')}.md
                                        </span>
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="ml-auto text-terminal-dim hover:text-terminal-green transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="p-6 font-mono text-sm">
                                        <h3 className="text-2xl font-bold text-terminal-green mb-2">
                                            # {selectedProject.title}
                                        </h3>

                                        <p className="text-terminal-dim mb-6 leading-relaxed">
                                            {selectedProject.longDescription}
                                        </p>

                                        <div className="mb-6">
                                            <h4 className="text-terminal-amber mb-3">## Features</h4>
                                            <ul className="space-y-2">
                                                {selectedProject.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-300">
                                                        <ChevronRight className="w-4 h-4 text-terminal-green flex-shrink-0 mt-0.5" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-terminal-amber mb-3">## Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1.5 bg-terminal-green/10 border border-terminal-green/30 rounded text-terminal-green"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-4 border-t border-terminal-green/20">
                                            {selectedProject.liveUrl && (
                                                <a
                                                    href={selectedProject.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 bg-terminal-green text-terminal-dark rounded font-bold hover:bg-terminal-green/80 transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Projects;
