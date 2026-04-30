import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Mail, Github, Globe, ArrowRight } from 'lucide-react';
import GlitchText from './effects/GlitchText';

const Hero = () => {
    const [typedText, setTypedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [commandIndex, setCommandIndex] = useState(0);

    const fullText = "Computer Engineering Student";
    const commands = [
        { prompt: '$ whoami', output: 'Alex Ruiz Lopez' },
        { prompt: '$ cat skills.txt', output: 'C • C++ • C# • Java • Python • OpenGL • Unity' },
        { prompt: '$ echo $PROFILE', output: 'UPF Computer Engineering Student (3rd year)' },
    ];

    // Typing effect for role
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    // Blinking cursor
    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorTimer);
    }, []);

    // Cycle through commands
    useEffect(() => {
        const commandTimer = setInterval(() => {
            setCommandIndex(prev => (prev + 1) % commands.length);
        }, 3000);

        return () => clearInterval(commandTimer);
    }, []);

    const skills = ["C", "C++", "C#", "Python", "Java", "OpenGL", "Unity", "Git", "Linux"];

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-20 pb-24">
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-terminal-green/5 via-transparent to-transparent" />

            <div className="relative z-10 text-center px-4 max-w-5xl">
                {/* Terminal Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-dark border border-terminal-green/30 rounded-lg text-terminal-green text-sm font-mono shadow-terminal">
                        <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse shadow-terminal" />
                        <span className="text-terminal-dim">status:</span>
                        <span>OPEN_TO_INTERNSHIPS</span>
                    </span>
                </motion.div>

                {/* Main Heading with Glitch Effect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="text-terminal-dim font-mono text-lg mb-2">
                        <span className="text-terminal-green">$</span> ./introduce.sh
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                        <GlitchText
                            text="Alex Ruiz Lopez"
                            className="text-terminal-green glow-text"
                            as="span"
                        />
                    </h1>
                </motion.div>

                {/* Typing Role */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="text-lg sm:text-xl md:text-2xl font-mono">
                        <span className="text-terminal-cyan">&gt;</span>
                        <span className="text-terminal-green ml-2">{typedText}</span>
                        <span className={`text-terminal-green ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▌</span>
                    </div>
                    <p className="text-terminal-dim mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-mono px-2">
                        <span className="text-terminal-amber">/*</span> Computer Engineering student at Universitat Pompeu Fabra with hands-on experience in software development,
                        AI projects, graphics programming, and systems work. Focused on learning fast, building solid solutions, and collaborating in teams. <span className="text-terminal-amber">*/</span>
                    </p>
                </motion.div>

                {/* Animated Terminal Output */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-10 max-w-lg mx-auto"
                >
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-btn terminal-btn-close" />
                            <div className="terminal-btn terminal-btn-minimize" />
                            <div className="terminal-btn terminal-btn-maximize" />
                            <span className="ml-4 text-terminal-dim text-xs font-mono">alex@portfolio:~</span>
                        </div>
                        <div className="p-4 font-mono text-sm text-left">
                            <motion.div
                                key={commandIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-terminal-green mb-1">
                                    {commands[commandIndex].prompt}
                                </div>
                                <div className="text-slate-300 pl-4">
                                    {commands[commandIndex].output}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Skills Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    {skills.map((skill, index) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-4 py-2 bg-terminal-dark/80 rounded-lg text-terminal-green text-sm font-mono border border-terminal-green/30 hover:border-terminal-green/60 hover:shadow-terminal transition-all duration-200"
                        >
                            <span className="text-terminal-dim mr-1">#</span>
                            {skill}
                        </motion.span>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group px-8 py-3 bg-terminal-green text-terminal-dark rounded-lg font-bold font-mono flex items-center gap-2 transition-all duration-200 shadow-terminal hover:shadow-terminal-lg"
                    >
                        <Code className="w-5 h-5" />
                        <span>./view_projects.sh</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group px-8 py-3 bg-terminal-dark border border-terminal-green/50 text-terminal-green rounded-lg font-medium font-mono flex items-center gap-2 transition-all duration-200 hover:border-terminal-green hover:shadow-terminal"
                    >
                        <Mail className="w-5 h-5" />
                        <span>open contact_form</span>
                    </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex justify-center gap-4 mb-12"
                >
                    <motion.a
                        href="https://github.com/alexruiz0"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="p-3 bg-terminal-dark/50 rounded-lg text-terminal-dim hover:text-terminal-green border border-terminal-green/20 hover:border-terminal-green/50 transition-all duration-200 hover:shadow-terminal"
                    >
                        <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                        href="https://alexruiz0.github.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="p-3 bg-terminal-dark/50 rounded-lg text-terminal-dim hover:text-terminal-cyan border border-terminal-green/20 hover:border-terminal-cyan/50 transition-all duration-200"
                    >
                        <Globe className="w-5 h-5" />
                    </motion.a>
                </motion.div>

                {/* Scroll Indicator - now in content flow */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col items-center gap-2 cursor-pointer mt-8"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-terminal-dim text-xs font-mono">scroll_down</span>
                        <ChevronDown className="text-terminal-green w-6 h-6 animate-pulse" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 text-terminal-green/20 font-mono text-xs hidden md:block">
                <div>{"<portfolio>"}</div>
            </div>
            <div className="absolute top-8 right-8 text-terminal-green/20 font-mono text-xs hidden md:block">
                <div>v1.0.0</div>
            </div>
            <div className="absolute bottom-8 left-8 text-terminal-green/20 font-mono text-xs hidden md:block">
                <div>line: 001</div>
            </div>
            <div className="absolute bottom-8 right-20 text-terminal-green/20 font-mono text-xs hidden md:block">
                <div>{"</portfolio>"}</div>
            </div>
        </section>
    );
};

export default Hero;


