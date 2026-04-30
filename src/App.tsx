// App.tsx - Terminal Portfolio
import { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import MatrixRain from './components/effects/MatrixRain';
import ScanLines from './components/effects/ScanLines';
import TerminalNav from './components/navigation/TerminalNav';

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentSection, setCurrentSection] = useState<string>('home');
    const [bootSequence, setBootSequence] = useState<string[]>([]);

    // Boot sequence messages
    const bootMessages = [
        'Initializing system...',
        'Loading kernel modules...',
        'Mounting file systems...',
        'Starting network services...',
        'Loading portfolio data...',
        'Establishing secure connection...',
        'System ready.',
    ];

    useEffect(() => {
        // Simulate boot sequence
        let messageIndex = 0;
        const bootInterval = setInterval(() => {
            if (messageIndex < bootMessages.length) {
                setBootSequence(prev => [...prev, bootMessages[messageIndex]]);
                messageIndex++;
            } else {
                clearInterval(bootInterval);
                setTimeout(() => setIsLoading(false), 500);
            }
        }, 350);

        return () => clearInterval(bootInterval);
    }, []);

    // Track current section based on scroll
    useEffect(() => {
        const sections = ['home', 'about', 'experience', 'projects', 'education', 'skills', 'contact'];

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setCurrentSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigate to section
    const handleNavigate = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-terminal-darker flex items-center justify-center relative overflow-hidden">
                {/* Matrix rain in background */}
                <MatrixRain />

                {/* Boot sequence terminal */}
                <div className="relative z-10 w-full max-w-2xl mx-4">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-btn terminal-btn-close" />
                            <div className="terminal-btn terminal-btn-minimize" />
                            <div className="terminal-btn terminal-btn-maximize" />
                            <span className="ml-4 text-terminal-dim text-sm font-mono">system-boot</span>
                        </div>

                        <div className="p-6 font-mono text-sm min-h-[300px]">
                            <div className="text-terminal-green mb-4">
                                <span className="text-terminal-cyan">ALEX-PORTFOLIO</span> Boot Sequence v1.0.0
                            </div>

                            {bootSequence.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 ${index === bootSequence.length - 1 ? 'text-terminal-green' : 'text-terminal-dim'}`}
                                >
                                    <span className="text-terminal-amber">[{String(index + 1).padStart(2, '0')}]</span>
                                    <span className="ml-2">{message}</span>
                                    {index === bootSequence.length - 1 && message !== 'System ready.' && (
                                        <span className="animate-blink ml-1">▌</span>
                                    )}
                                    {message === 'System ready.' && (
                                        <span className="text-terminal-green ml-2">✓</span>
                                    )}
                                </div>
                            ))}

                            {bootSequence.length < bootMessages.length && (
                                <div className="text-terminal-green">
                                    <span className="animate-blink">▌</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Loading progress bar */}
                    <div className="mt-4 h-1 bg-terminal-dark rounded-full overflow-hidden">
                        <div
                            className="h-full bg-terminal-green transition-all duration-300 shadow-terminal"
                            style={{ width: `${(bootSequence.length / bootMessages.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-terminal-darker relative overflow-x-hidden">
            {/* Background Effects */}
            <MatrixRain />
            <ScanLines />

            {/* Grid pattern overlay */}
            <div className="fixed inset-0 bg-grid pointer-events-none z-0" />

            {/* Main Content */}
            <main className="relative z-10">
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Education />
                <Skills />
                <Contact />
            </main>

            {/* Terminal Navigation */}
            <TerminalNav
                currentSection={currentSection}
                onNavigate={handleNavigate}
            />

            {/* Footer */}
            <footer className="relative z-10 py-8 border-t border-terminal-green/20 bg-terminal-darker/80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 text-center font-mono text-sm">
                    <div className="text-terminal-dim mb-2">
                        <span className="text-terminal-green">$</span> echo "© 2026 Alex Ruiz Lopez."
                    </div>
                    <div className="text-terminal-green/50">
                        Built with <span className="text-terminal-cyan">React</span> + <span className="text-terminal-amber">TypeScript</span> + <span className="text-terminal-magenta">TailwindCSS</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
