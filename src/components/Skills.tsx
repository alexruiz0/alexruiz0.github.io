import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    Code, Database, Server, Globe,
    Wrench, GitBranch, Terminal, Layers, Brain
} from 'lucide-react';

interface Skill {
    name: string;
    level: number;
    icon: React.ReactNode;
}

interface SkillCategory {
    title: string;
    command: string;
    skills: Skill[];
}

const Skills = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const skillCategories: SkillCategory[] = [
        {
            title: 'Programming Languages',
            command: 'ls languages/',
            skills: [
                { name: 'C', level: 88, icon: <Code className="w-4 h-4" /> },
                { name: 'C++', level: 60, icon: <Code className="w-4 h-4" /> },
                { name: 'C#/Unity', level: 55, icon: <Code className="w-4 h-4" /> },
                { name: 'Java', level: 80, icon: <Code className="w-4 h-4" /> },
                { name: 'Python', level: 75, icon: <Terminal className="w-4 h-4" /> },
                { name: 'Solidity', level: 40, icon: <Server className="w-4 h-4" /> },
            ],
        },
        {
            title: 'AI & Algorithms',
            command: 'ls ai/',
            skills: [
                { name: 'DFS / BFS', level: 80, icon: <Brain className="w-4 h-4" /> },
                { name: 'A* Search', level: 78, icon: <Brain className="w-4 h-4" /> },
                { name: 'Minimax + Alpha-Beta', level: 76, icon: <Brain className="w-4 h-4" /> },
                { name: 'Heuristic Design', level: 74, icon: <Brain className="w-4 h-4" /> },
            ],
        },
        {
            title: 'Graphics & Game Dev',
            command: 'ls graphics/',
            skills: [
                { name: 'Unity', level: 55, icon: <Globe className="w-4 h-4" /> },
                { name: 'OpenGL', level: 76, icon: <Layers className="w-4 h-4" /> },
                { name: 'GLSL', level: 74, icon: <Layers className="w-4 h-4" /> },
                { name: '3D Transformations', level: 72, icon: <Code className="w-4 h-4" /> },
            ],
        },
        {
            title: 'Tools & Platforms',
            command: 'ls devops/',
            skills: [
                { name: 'Git / GitHub', level: 93, icon: <GitBranch className="w-4 h-4" /> },
                { name: 'Linux (Ubuntu)', level: 93, icon: <Terminal className="w-4 h-4" /> },
                { name: 'Visual Studio Code', level: 90, icon: <Wrench className="w-4 h-4" /> },
                { name: 'Visual Studio', level: 82, icon: <Wrench className="w-4 h-4" /> },
                { name: 'Proxmox', level: 70, icon: <Server className="w-4 h-4" /> },
            ],
        },
    ];

    const getSkillColor = (level: number) => {
        if (level >= 90) return 'terminal-green';
        if (level >= 75) return 'terminal-cyan';
        if (level >= 60) return 'terminal-amber';
        return 'terminal-dim';
    };

    const getSkillLabel = (level: number) => {
        if (level >= 90) return 'EXPERT';
        if (level >= 75) return 'ADVANCED';
        if (level >= 60) return 'INTERMEDIATE';
        return 'LEARNING';
    };

    return (
        <section id="skills" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative" ref={ref}>
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
                        <span className="text-white">npm list --depth=0</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-px flex-grow bg-gradient-to-r from-terminal-green/50 to-transparent" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-terminal-green flex items-center gap-3">
                            <span className="text-terminal-dim">{'//'}</span>
                            TECH_STACK
                            <span className="animate-pulse">_</span>
                        </h2>
                        <div className="h-px flex-grow bg-gradient-to-l from-terminal-green/50 to-transparent" />
                    </div>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: catIndex * 0.15 }}
                            className="terminal-window"
                        >
                            <div className="terminal-header">
                                <div className="terminal-btn terminal-btn-close" />
                                <div className="terminal-btn terminal-btn-minimize" />
                                <div className="terminal-btn terminal-btn-maximize" />
                                <span className="ml-4 text-terminal-dim text-xs font-mono">
                                    {category.title.toLowerCase()}_skills.sh
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="text-terminal-green font-mono text-sm mb-6">
                                    $ {category.command}
                                </div>

                                <div className="space-y-5">
                                    {category.skills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                            transition={{ delay: catIndex * 0.15 + skillIndex * 0.1 }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2 font-mono text-sm">
                                                    <span className={`text-${getSkillColor(skill.level)}`}>
                                                        {skill.icon}
                                                    </span>
                                                    <span className="text-slate-300">{skill.name}</span>
                                                </div>
                                                <div className="flex items-center gap-3 font-mono text-xs">
                                                    <span className={`text-${getSkillColor(skill.level)}`}>
                                                        {skill.level}%
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded text-${getSkillColor(skill.level)} bg-${getSkillColor(skill.level)}/10 border border-${getSkillColor(skill.level)}/30`}>
                                                        {getSkillLabel(skill.level)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Progress bar */}
                                            <div className="h-2 bg-terminal-dark rounded-full overflow-hidden">
                                                <motion.div
                                                    className={`h-full bg-${getSkillColor(skill.level)}`}
                                                    initial={{ width: 0 }}
                                                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                                    transition={{ duration: 1, delay: catIndex * 0.15 + skillIndex * 0.1 + 0.3 }}
                                                    style={{
                                                        boxShadow: skill.level >= 90
                                                            ? '0 0 10px rgba(0, 255, 65, 0.5)'
                                                            : skill.level >= 75
                                                                ? '0 0 10px rgba(0, 217, 255, 0.5)'
                                                                : 'none'
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8"
                >
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-btn terminal-btn-close" />
                            <div className="terminal-btn terminal-btn-minimize" />
                            <div className="terminal-btn terminal-btn-maximize" />
                            <span className="ml-4 text-terminal-dim text-xs font-mono">additional_skills.txt</span>
                        </div>

                        <div className="p-6">
                            <div className="text-terminal-green font-mono text-sm mb-4">
                                $ cat additional_skills.txt | sort
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {[
                                    'Cybersecurity Incident Response',
                                    'Blockchain Fundamentals',
                                    'Teamwork',
                                    'Adaptability',
                                    'Resilience',
                                    'Software Engineering',
                                    'Databases',
                                    'Theory of Computation',
                                    'Computer Graphics',
                                    'Machine Learning',
                                    'Spanish (Native)',
                                    'Catalan (Native)',
                                    'English (B2)',
                                ].map((skill, index) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                        transition={{ delay: 0.7 + index * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="px-3 py-2 bg-terminal-dark border border-terminal-green/20 rounded-lg text-terminal-green font-mono text-sm hover:border-terminal-green/50 hover:shadow-terminal transition-all cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Skills;
