import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TerminalSectionProps {
    id: string;
    title: string;
    command: string;
    children: ReactNode;
    className?: string;
}

const TerminalSection: React.FC<TerminalSectionProps> = ({
    id,
    title,
    command,
    children,
    className = '',
}) => {
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

    const headerVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        },
    };

    return (
        <section
            id={id}
            ref={ref}
            className={`min-h-screen py-20 px-4 md:px-8 lg:px-16 relative ${className}`}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="max-w-6xl mx-auto"
            >
                {/* Terminal Header */}
                <motion.div variants={headerVariants} className="mb-8">
                    {/* Command line */}
                    <div className="flex items-center gap-2 mb-4 font-mono text-sm">
                        <span className="text-terminal-green">➜</span>
                        <span className="text-terminal-cyan">~/portfolio</span>
                        <span className="text-white">{command}</span>
                    </div>

                    {/* Section title with decorations */}
                    <div className="flex items-center gap-4">
                        <motion.div
                            className="h-px flex-grow bg-gradient-to-r from-terminal-green/50 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{ transformOrigin: 'left' }}
                        />
                        <h2 className="text-3xl md:text-4xl font-bold font-mono text-terminal-green flex items-center gap-3">
                            <span className="text-terminal-dim">{'//'}</span>
                            {title}
                            <span className="animate-pulse text-terminal-green">_</span>
                        </h2>
                        <motion.div
                            className="h-px flex-grow bg-gradient-to-l from-terminal-green/50 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{ transformOrigin: 'right' }}
                        />
                    </div>

                    {/* Output indicator */}
                    <motion.div
                        variants={headerVariants}
                        className="mt-4 text-terminal-dim font-mono text-xs"
                    >
                        <span className="text-terminal-amber">OUTPUT:</span>
                    </motion.div>
                </motion.div>

                {/* Content */}
                <motion.div variants={contentVariants} className="relative">
                    {/* Decorative corner brackets */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-terminal-green/30" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-terminal-green/30" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-terminal-green/30" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-terminal-green/30" />

                    {children}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default TerminalSection;
