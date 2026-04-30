import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal, Home, User, Briefcase, Code,
    GraduationCap, Cpu, Mail, X, ChevronRight
} from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    command: string;
    icon: React.ReactNode;
}

interface TerminalNavProps {
    currentSection: string;
    onNavigate: (sectionId: string) => void;
}

const TerminalNav: React.FC<TerminalNavProps> = ({ currentSection, onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [showOutput, setShowOutput] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const navItems: NavItem[] = [
        { id: 'home', label: 'Home', command: 'cd ~', icon: <Home className="w-4 h-4" /> },
        { id: 'about', label: 'About', command: 'cat about.txt', icon: <User className="w-4 h-4" /> },
        { id: 'experience', label: 'Experience', command: 'ls experience/', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'projects', label: 'Projects', command: 'git log --projects', icon: <Code className="w-4 h-4" /> },
        { id: 'education', label: 'Education', command: 'cat education.md', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'skills', label: 'Skills', command: 'npm list --depth=0', icon: <Cpu className="w-4 h-4" /> },
        { id: 'contact', label: 'Contact', command: 'ssh connect@alex', icon: <Mail className="w-4 h-4" /> },
    ];

    const handleCommand = (command: string) => {
        const item = navItems.find(i => i.command === command);
        if (item) {
            setShowOutput(`Navigating to ${item.label}...`);
            setCommandHistory(prev => [...prev, command]);
            setTimeout(() => {
                onNavigate(item.id);
                setShowOutput(null);
                setCurrentCommand('');
            }, 500);
        } else if (command === 'help') {
            setShowOutput('Available commands: ' + navItems.map(i => i.command).join(', '));
        } else if (command === 'clear') {
            setCommandHistory([]);
            setCurrentCommand('');
            setShowOutput(null);
        } else if (command) {
            setShowOutput(`Command not found: ${command}. Type 'help' for available commands.`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(currentCommand.trim());
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Keyboard shortcut to open terminal
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === '`') {
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    return (
        <>
            {/* Terminal Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 p-3 md:p-4 bg-terminal-dark border-2 border-terminal-green rounded-lg 
                   shadow-terminal hover:shadow-terminal-lg transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <Terminal className="w-6 h-6 text-terminal-green group-hover:animate-pulse" />
                <span className="absolute -top-8 left-0 text-xs text-terminal-dim font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Ctrl + `
                </span>
            </motion.button>

            {/* Quick Nav Dots */}
            <motion.div
                className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
            >
                {navItems.map((item, index) => (
                    <motion.button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`group relative p-2 rounded-lg border transition-all duration-300 ${currentSection === item.id
                            ? 'bg-terminal-green/20 border-terminal-green shadow-terminal'
                            : 'bg-terminal-dark/50 border-terminal-dim/30 hover:border-terminal-green/50'
                            }`}
                        whileHover={{ scale: 1.1, x: -5 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                    >
                        <span className={`${currentSection === item.id ? 'text-terminal-green' : 'text-terminal-dim group-hover:text-terminal-green'}`}>
                            {item.icon}
                        </span>

                        {/* Tooltip */}
                        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-terminal-dark border border-terminal-green/50 rounded text-xs font-mono text-terminal-green opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <ChevronRight className="inline w-3 h-3 mr-1" />
                            {item.command}
                        </span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Terminal Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Terminal Window Container - using flexbox for centering */}
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        >
                            <motion.div
                                className="w-full max-w-2xl"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: 'spring', damping: 25 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Terminal Header */}
                                <div className="bg-terminal-dark border-2 border-terminal-green rounded-t-lg p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                                            />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                        </div>
                                        <span className="ml-2 md:ml-4 text-terminal-dim font-mono text-xs md:text-sm truncate">alex@portfolio:~</span>
                                    </div>
                                    <button onClick={() => setIsOpen(false)} className="text-terminal-dim hover:text-terminal-green transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Terminal Body */}
                                <div className="bg-black/95 border-2 border-t-0 border-terminal-green rounded-b-lg p-3 md:p-4 font-mono text-xs md:text-sm min-h-[250px] max-h-[60vh] overflow-auto">
                                    {/* Welcome message */}
                                    <div className="text-terminal-green mb-4">
                                        <p>Welcome to Alex's Portfolio Terminal v1.0.0</p>
                                        <p className="text-terminal-dim">Type 'help' for available commands or click below:</p>
                                    </div>

                                    {/* Quick command buttons */}
                                    <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-terminal-green/20">
                                        {navItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => handleCommand(item.command)}
                                                className={`px-3 py-1.5 rounded border font-mono text-xs transition-all duration-200 flex items-center gap-2 ${currentSection === item.id
                                                    ? 'bg-terminal-green/20 border-terminal-green text-terminal-green'
                                                    : 'bg-terminal-dark border-terminal-dim/50 text-terminal-dim hover:border-terminal-green hover:text-terminal-green'
                                                    }`}
                                            >
                                                {item.icon}
                                                {item.command}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Command history */}
                                    {commandHistory.map((cmd, index) => (
                                        <div key={index} className="mb-1">
                                            <span className="text-terminal-green">➜</span>
                                            <span className="text-terminal-cyan ml-2">~</span>
                                            <span className="text-white ml-2">{cmd}</span>
                                        </div>
                                    ))}

                                    {/* Output */}
                                    {showOutput && (
                                        <div className="text-terminal-amber mb-2 animate-pulse">{showOutput}</div>
                                    )}

                                    {/* Current input line */}
                                    <div className="flex items-center">
                                        <span className="text-terminal-green">➜</span>
                                        <span className="text-terminal-cyan ml-2">~</span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={currentCommand}
                                            onChange={(e) => setCurrentCommand(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="flex-1 bg-transparent border-none outline-none text-white ml-2 font-mono caret-terminal-green"
                                            placeholder="Type a command..."
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default TerminalNav;

