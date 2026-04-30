import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as = 'span' }) => {
    const Component = as;

    return (
        <Component className={`relative inline-block ${className}`}>
            {/* Main text */}
            <span className="relative z-10">{text}</span>

            {/* Glitch layers */}
            <motion.span
                className="absolute inset-0 text-terminal-cyan z-0"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
                animate={{
                    x: [0, -2, 0, 2, 0],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 0.15,
                    repeat: Infinity,
                    repeatDelay: 3,
                }}
                aria-hidden="true"
            >
                {text}
            </motion.span>

            <motion.span
                className="absolute inset-0 text-terminal-magenta z-0"
                style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
                animate={{
                    x: [0, 2, 0, -2, 0],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 0.15,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: 0.05,
                }}
                aria-hidden="true"
            >
                {text}
            </motion.span>
        </Component>
    );
};

export default GlitchText;
