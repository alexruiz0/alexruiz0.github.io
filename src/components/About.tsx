import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, MapPin, Calendar, FileCode, Database } from 'lucide-react';

const About = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const stats = [
        { label: 'academic_year', value: '3rd', icon: <Calendar className="w-4 h-4" /> },
        { label: 'major_projects', value: '5+', icon: <FileCode className="w-4 h-4" /> },
        { label: 'core_technologies', value: '10+', icon: <Database className="w-4 h-4" /> },
        { label: 'team_projects', value: '6+', icon: <User className="w-4 h-4" /> },
    ];

    const technologies = [
        { name: 'C / C++', level: 88, color: 'terminal-green' },
        { name: 'Python', level: 78, color: 'terminal-cyan' },
        { name: 'Java', level: 74, color: 'terminal-cyan' },
        { name: 'C# / Unity', level: 80, color: 'terminal-amber' },
        { name: 'OpenGL / GLSL', level: 76, color: 'terminal-amber' },
        { name: 'Linux / Git', level: 82, color: 'terminal-green' },
    ];

    return (
        <section id="about" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative" ref={ref}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="max-w-6xl mx-auto"
            >
                {/* Terminal Header */}
                <motion.div variants={itemVariants} className="mb-12">
                    <div className="flex items-center gap-2 mb-4 font-mono text-sm">
                        <span className="text-terminal-green">➜</span>
                        <span className="text-terminal-cyan">~/portfolio</span>
                        <span className="text-white">cat about.txt</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-px flex-grow bg-gradient-to-r from-terminal-green/50 to-transparent" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-terminal-green flex items-center gap-3">
                            <span className="text-terminal-dim">{'//'}</span>
                            ABOUT_ME
                            <span className="animate-pulse">_</span>
                        </h2>
                        <div className="h-px flex-grow bg-gradient-to-l from-terminal-green/50 to-transparent" />
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Bio */}
                    <motion.div variants={itemVariants}>
                        <div className="terminal-window h-full">
                            <div className="terminal-header">
                                <div className="terminal-btn terminal-btn-close" />
                                <div className="terminal-btn terminal-btn-minimize" />
                                <div className="terminal-btn terminal-btn-maximize" />
                                <span className="ml-4 text-terminal-dim text-xs font-mono">about.txt</span>
                            </div>

                            <div className="p-6 font-mono text-sm space-y-4">
                                <div className="text-terminal-amber">/* Personal Information */</div>

                                <div className="space-y-2">
                                    <p className="text-slate-300">
                                        <span className="text-terminal-cyan">const</span>{' '}
                                        <span className="text-terminal-green">developer</span> = {'{'}
                                    </p>
                                    <p className="pl-4 text-slate-300">
                                        <span className="text-terminal-amber">name</span>: <span className="text-terminal-green">"Alex Ruiz Lopez"</span>,
                                    </p>
                                    <p className="pl-4 text-slate-300">
                                        <span className="text-terminal-amber">role</span>: <span className="text-terminal-green">"Computer Engineering Student"</span>,
                                    </p>
                                    <p className="pl-4 text-slate-300">
                                        <span className="text-terminal-amber">location</span>: <span className="text-terminal-green">"Barcelona, Spain"</span>,
                                    </p>
                                    <p className="pl-4 text-slate-300">
                                        <span className="text-terminal-amber">experience</span>: <span className="text-terminal-cyan">1</span>,
                                    </p>
                                    <p className="text-slate-300">{'}'}</p>
                                </div>

                                <div className="border-t border-terminal-green/20 pt-4 mt-4">
                                    <p className="text-terminal-dim leading-relaxed">
                                        I am a Computer Engineering student at Universitat Pompeu Fabra, currently in my third year.
                                        I am responsible, proactive, and comfortable learning quickly and collaborating with teams.
                                        I enjoy software development, artificial intelligence, graphics programming, and systems projects,
                                        and I am looking for opportunities to keep growing professionally.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-terminal-dim">
                                    <MapPin className="w-4 h-4 text-terminal-green" />
                                    <span>Based in Barcelona, Spain</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Stats & Skills */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="matrix-card p-4"
                                    whileHover={{ scale: 1.02, borderColor: 'rgba(0, 255, 65, 0.4)' }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-terminal-green">{stat.icon}</span>
                                        <span className="text-terminal-dim font-mono text-xs">{stat.label}</span>
                                    </div>
                                    <div className="text-3xl font-bold text-terminal-green font-mono glow-text-sm">
                                        {stat.value}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Skills Progress */}
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-btn terminal-btn-close" />
                                <div className="terminal-btn terminal-btn-minimize" />
                                <div className="terminal-btn terminal-btn-maximize" />
                                <span className="ml-4 text-terminal-dim text-xs font-mono">skills.log</span>
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="text-terminal-green font-mono text-xs mb-4">
                                    $ npm list --depth=0
                                </div>

                                {technologies.map((tech, index) => (
                                    <motion.div
                                        key={tech.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="space-y-1"
                                    >
                                        <div className="flex justify-between font-mono text-xs">
                                            <span className="text-terminal-dim">├── {tech.name}</span>
                                            <span className={`text-${tech.color}`}>{tech.level}%</span>
                                        </div>
                                        <div className="h-1.5 bg-terminal-dark rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full bg-${tech.color} shadow-terminal`}
                                                initial={{ width: 0 }}
                                                animate={inView ? { width: `${tech.level}%` } : { width: 0 }}
                                                transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
