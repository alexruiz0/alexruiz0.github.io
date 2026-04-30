import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalTextProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
    showCursor?: boolean;
    onComplete?: () => void;
    prefix?: string;
}

const TerminalText: React.FC<TerminalTextProps> = ({
    text,
    delay = 0,
    speed = 50,
    className = '',
    showCursor = true,
    onComplete,
    prefix = '',
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setIsTyping(true);
            let currentIndex = 0;

            const typeInterval = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(typeInterval);
                    setIsTyping(false);
                    setIsComplete(true);
                    onComplete?.();
                }
            }, speed);

            return () => clearInterval(typeInterval);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, delay, speed, onComplete]);

    return (
        <span className={`font-mono ${className}`}>
            {prefix && <span className="text-terminal-green">{prefix}</span>}
            {displayedText}
            {showCursor && (
                <motion.span
                    animate={{ opacity: isTyping ? 1 : [1, 0] }}
                    transition={{
                        duration: 0.5,
                        repeat: isComplete ? Infinity : 0,
                        repeatType: 'reverse',
                    }}
                    className="inline-block w-2 h-5 bg-terminal-green ml-0.5 align-middle"
                />
            )}
        </span>
    );
};

export default TerminalText;
