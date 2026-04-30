import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin, ChevronRight, GitBranch } from 'lucide-react';

interface ExperienceItem {
    id: number;
    company: string;
    role: string;
    period: string;
    location: string;
    description: string[];
    technologies: string[];
}

const Experience = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const experiences: ExperienceItem[] = [
        {
            id: 1,
            company: 'Carrefour',
            role: 'Gas Station Assistant',
            period: 'Jul 2024 - Sep 2024',
            location: 'Cabrera de Mar, Spain',
            description: [
                'Handled customer support and day-to-day operations at the service station',
                'Supported maintenance and operational tasks to keep service quality high',
                'Worked in a fast-paced environment with responsibility and attention to detail',
            ],
            technologies: ['Customer Service', 'Operations', 'Maintenance'],
        },
        {
            id: 2,
            company: 'Xurreria Menxu Bellavista',
            role: 'Family Business Worker',
            period: ' ',
            location: 'Les Franqueses del Valles, Spain',
            description: [
                'Prepared and sold traditional fried dough products in a customer-facing environment',
                'Designed, managed, and published the business website',
                'Helped improve the digital presence and operations of the family business',
            ],
            technologies: ['Website Management', 'Content Publishing', 'Customer Service'],
        },
    ];

    return (
        <section id="experience" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative" ref={ref}>
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
                        <span className="text-white">ls -la experience/</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-px flex-grow bg-gradient-to-r from-terminal-green/50 to-transparent" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-terminal-green flex items-center gap-3">
                            <span className="text-terminal-dim">{'//'}</span>
                            WORK_EXPERIENCE
                            <span className="animate-pulse">_</span>
                        </h2>
                        <div className="h-px flex-grow bg-gradient-to-l from-terminal-green/50 to-transparent" />
                    </div>
                </motion.div>

                {/* Git-style timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-terminal-green/30 hidden md:block" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative mb-8 md:ml-16"
                        >
                            {/* Git commit dot */}
                            <div className="absolute -left-[4.25rem] top-6 hidden md:flex items-center justify-center w-6 h-6 bg-terminal-dark border-2 border-terminal-green rounded-full shadow-terminal">
                                <GitBranch className="w-3 h-3 text-terminal-green" />
                            </div>

                            {/* Experience card */}
                            <div className="terminal-window group hover:shadow-terminal-lg transition-all duration-300">
                                <div className="terminal-header">
                                    <div className="terminal-btn terminal-btn-close" />
                                    <div className="terminal-btn terminal-btn-minimize" />
                                    <div className="terminal-btn terminal-btn-maximize" />
                                    <span className="ml-4 text-terminal-dim text-xs font-mono">job_{exp.id}.json</span>
                                </div>

                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-terminal-green font-mono flex items-center gap-2">
                                                <Briefcase className="w-5 h-5" />
                                                {exp.role}
                                            </h3>
                                            <p className="text-terminal-cyan font-mono mt-1">@ {exp.company}</p>
                                        </div>
                                        <div className="flex flex-col items-end text-sm font-mono">
                                            <span className="flex items-center gap-2 text-terminal-amber">
                                                <Calendar className="w-4 h-4" />
                                                {exp.period}
                                            </span>
                                            <span className="flex items-center gap-2 text-terminal-dim mt-1">
                                                <MapPin className="w-4 h-4" />
                                                {exp.location}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description as code comments */}
                                    <div className="mb-4 space-y-2">
                                        <div className="text-terminal-dim font-mono text-xs">// Responsibilities:</div>
                                        {exp.description.map((desc, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm text-slate-300 font-mono">
                                                <ChevronRight className="w-4 h-4 text-terminal-green flex-shrink-0 mt-0.5" />
                                                <span>{desc}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Technologies as tags */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-terminal-dim font-mono text-xs">tech_stack: [</span>
                                        {exp.technologies.map((tech, i) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-terminal-green/10 border border-terminal-green/30 rounded text-terminal-green text-xs font-mono"
                                            >
                                                "{tech}"{i < exp.technologies.length - 1 ? ',' : ''}
                                            </span>
                                        ))}
                                        <span className="text-terminal-dim font-mono text-xs">]</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* End of timeline */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.8 }}
                        className="relative md:ml-16 mt-8"
                    >
                        <div className="absolute -left-[4.25rem] top-2 hidden md:flex items-center justify-center w-6 h-6 bg-terminal-green rounded-full">
                            <span className="text-terminal-dark text-xs font-bold">✓</span>
                        </div>
                        <div className="font-mono text-sm text-terminal-dim">
                            <span className="text-terminal-green">$</span> echo "Currently open to new opportunities!"
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Experience;
