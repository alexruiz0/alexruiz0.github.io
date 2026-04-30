
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

interface EducationItem {
    id: number;
    degree: string;
    institution: string;
    period: string;
    location: string;
    description: string;
    achievements?: string[];
}

const Education = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const education: EducationItem[] = [
        {
            id: 1,
            degree: 'Computer Engineering (BSc)',
            institution: 'Universitat Pompeu Fabra',
            period: '2023 - 2027 (In Progress)',
            location: 'Barcelona, Spain',
            description: 'Currently in third year, focused on software engineering, algorithms, graphics, and machine learning.',
            achievements: [
                'Relevant coursework: Computer Graphics, Machine Learning, OOP, Databases, Software Engineering',
                'Strong foundation in computation theory and systems development',
                'Active participation in collaborative technical projects',
            ],
        },
        {
            id: 2,
            degree: 'Technological Baccalaureate',
            institution: 'Institut Valeria Pujol i Bosch',
            period: '2023',
            location: 'Premia de Dalt, Spain',
            description: 'Academic foundation in technology, mathematics, and scientific reasoning.',
        },
    ];

    const certifications = [
        { name: 'Cybersecurity Training - Ciber 360', issuer: 'Ciber 360', year: '2026' },
    ];

    return (
        <section id="education" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative" ref={ref}>
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
                        <span className="text-white">cat education.md</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-px flex-grow bg-gradient-to-r from-terminal-green/50 to-transparent" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-terminal-green flex items-center gap-3">
                            <span className="text-terminal-dim">{'//'}</span>
                            EDUCATION
                            <span className="animate-pulse">_</span>
                        </h2>
                        <div className="h-px flex-grow bg-gradient-to-l from-terminal-green/50 to-transparent" />
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Education Timeline */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            className="text-terminal-amber font-mono text-sm mb-4"
                        >
                            ## Academic Background
                        </motion.div>

                        {education.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: index * 0.2 }}
                                className="terminal-window"
                            >
                                <div className="terminal-header">
                                    <div className="terminal-btn terminal-btn-close" />
                                    <div className="terminal-btn terminal-btn-minimize" />
                                    <div className="terminal-btn terminal-btn-maximize" />
                                    <span className="ml-4 text-terminal-dim text-xs font-mono">degree_{edu.id}.json</span>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-terminal-green/10 rounded-lg border border-terminal-green/30">
                                            <GraduationCap className="w-6 h-6 text-terminal-green" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-terminal-green font-mono mb-1">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-terminal-cyan font-mono text-sm mb-3">
                                                @ {edu.institution}
                                            </p>

                                            <div className="flex flex-wrap gap-4 text-sm font-mono text-terminal-dim mb-4">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {edu.period}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {edu.location}
                                                </span>
                                            </div>

                                            <p className="text-slate-400 text-sm mb-4 font-mono">
                                                <span className="text-terminal-dim">// </span>{edu.description}
                                            </p>

                                            {edu.achievements && (
                                                <div className="space-y-2">
                                                    <span className="text-terminal-amber text-xs font-mono">achievements: [</span>
                                                    {edu.achievements.map((achievement, i) => (
                                                        <div key={i} className="flex items-center gap-2 pl-4 text-sm font-mono">
                                                            <Award className="w-3 h-3 text-terminal-amber" />
                                                            <span className="text-slate-300">"{achievement}"</span>
                                                            {i < edu.achievements!.length - 1 && <span className="text-terminal-dim">,</span>}
                                                        </div>
                                                    ))}
                                                    <span className="text-terminal-amber text-xs font-mono">]</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Certifications */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            className="text-terminal-amber font-mono text-sm mb-4"
                        >
                            ## Certifications & Courses
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.3 }}
                            className="terminal-window h-fit"
                        >
                            <div className="terminal-header">
                                <div className="terminal-btn terminal-btn-close" />
                                <div className="terminal-btn terminal-btn-minimize" />
                                <div className="terminal-btn terminal-btn-maximize" />
                                <span className="ml-4 text-terminal-dim text-xs font-mono">certifications.log</span>
                            </div>

                            <div className="p-6">
                                <div className="text-terminal-green font-mono text-sm mb-4">
                                    $ cat certifications.log | grep --color "verified"
                                </div>

                                <div className="space-y-4">
                                    {certifications.map((cert, index) => (
                                        <motion.div
                                            key={cert.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className="group flex items-center gap-4 p-3 rounded-lg bg-terminal-dark/50 border border-terminal-green/20 hover:border-terminal-green/40 transition-all"
                                        >
                                            <div className="p-2 bg-terminal-green/10 rounded-lg">
                                                <BookOpen className="w-4 h-4 text-terminal-green" />
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="text-terminal-green font-mono text-sm group-hover:glow-text-sm transition-all">
                                                    {cert.name}
                                                </h4>
                                                <p className="text-terminal-dim text-xs font-mono">
                                                    {cert.issuer} • {cert.year}
                                                </p>
                                            </div>

                                            <span className="text-terminal-green text-xs font-mono px-2 py-1 bg-terminal-green/10 rounded">
                                                ✓ VERIFIED
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-terminal-green/20">
                                    <p className="text-terminal-dim font-mono text-xs">
                                        <span className="text-terminal-green">INFO:</span> Continuously learning and updating skills
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Learning Progress */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.5 }}
                            className="terminal-window mt-6"
                        >
                            <div className="terminal-header">
                                <div className="terminal-btn terminal-btn-close" />
                                <div className="terminal-btn terminal-btn-minimize" />
                                <div className="terminal-btn terminal-btn-maximize" />
                                <span className="ml-4 text-terminal-dim text-xs font-mono">currently_learning.sh</span>
                            </div>

                            <div className="p-6 font-mono text-sm">
                                <div className="text-terminal-green mb-4">$ ./currently_learning.sh</div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-300">Advanced AI Techniques</span>
                                        <span className="text-terminal-amber">IN_PROGRESS</span>
                                    </div>
                                    <div className="h-2 bg-terminal-dark rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-terminal-green to-terminal-cyan"
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: '70%' } : { width: 0 }}
                                            transition={{ duration: 1, delay: 0.8 }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-slate-300">Cybersecurity</span>
                                        <span className="text-terminal-amber">IN_PROGRESS</span>
                                    </div>
                                    <div className="h-2 bg-terminal-dark rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-terminal-green to-terminal-cyan"
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: '60%' } : { width: 0 }}
                                            transition={{ duration: 1, delay: 1 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Education;
