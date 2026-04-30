import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    Mail, Send, User, MessageSquare,
    Github, Globe, MapPin, Clock,
    CheckCircle, AlertCircle, Loader2, AtSign
} from 'lucide-react';

const Contact = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([
        '$ ssh connect@alex.dev',
        'Connecting to server...',
        'Connection established.',
        'Ready to receive message.',
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (Object.values(formData).some(value => !value.trim())) {
            setError("All fields are required");
            return;
        }

        setStatus('sending');

        // Add terminal output
        setTerminalOutput(prev => [
            ...prev,
            '',
            `$ send_message --from="${formData.name}"`,
            'Encrypting message...',
            'Sending to alex@portfolio...',
        ]);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'null',
                    subject: formData.subject,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    from_name: "Portfolio Contact Form"
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setTerminalOutput(prev => [
                    ...prev,
                    'Message sent successfully! ✓',
                    'Thank you for reaching out.',
                ]);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error(result.message || 'Something went wrong!');
            }
        } catch (err: unknown) {
            setStatus('error');
            const errorMessage = err instanceof Error ? err.message : "Failed to send message. Please try again.";
            setError(errorMessage);
            setTerminalOutput(prev => [
                ...prev,
                `ERROR: ${errorMessage}`,
            ]);
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="w-5 h-5" />,
            label: 'contact',
            value: 'alexruizlopez7@gmail.com',
            href: null,
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            label: 'location',
            value: 'Barcelona, Spain',
            href: null,
        },
        {
            icon: <Clock className="w-5 h-5" />,
            label: 'timezone',
            value: 'UTC+1 / UTC+2 (CET/CEST)',
            href: null,
        },
    ];

    const socialLinks = [
        {
            icon: <Github className="w-5 h-5" />,
            label: 'GitHub',
            href: 'https://github.com/alexruiz0',
            command: 'git clone alexruiz0',
        },
        {
            icon: <Globe className="w-5 h-5" />,
            label: 'Portfolio',
            href: 'https://alexruiz0.github.io',
            command: 'open portfolio',
        },
    ];

    return (
        <section id="contact" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative" ref={ref}>
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
                        <span className="text-white">ssh connect@alex.dev</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-px flex-grow bg-gradient-to-r from-terminal-green/50 to-transparent" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-terminal-green flex items-center gap-3">
                            <span className="text-terminal-dim">{'//'}</span>
                            CONTACT
                            <span className="animate-pulse">_</span>
                        </h2>
                        <div className="h-px flex-grow bg-gradient-to-l from-terminal-green/50 to-transparent" />
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-btn terminal-btn-close" />
                                <div className="terminal-btn terminal-btn-minimize" />
                                <div className="terminal-btn terminal-btn-maximize" />
                                <span className="ml-4 text-terminal-dim text-xs font-mono">compose_message.sh</span>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {/* Anti-spam honeypot */}
                                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                                <div className="text-terminal-amber font-mono text-sm mb-4">
                                    /* Fill in the form below to send a message */
                                </div>

                                {/* Error message */}
                                {error && (
                                    <div className="bg-terminal-red/10 border border-terminal-red/30 text-terminal-red px-4 py-3 rounded-lg flex items-center gap-2 font-mono text-sm">
                                        <AlertCircle className="w-5 h-5" />
                                        {error}
                                    </div>
                                )}

                                {/* Name & Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-terminal-dim font-mono text-xs mb-2">
                                            <span className="text-terminal-cyan">const</span> name =
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-dim" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-terminal-dark border border-terminal-green/30 rounded-lg pl-10 pr-4 py-3 font-mono text-sm text-slate-200 placeholder-terminal-dim/50 focus:border-terminal-green focus:outline-none focus:shadow-terminal transition-all"
                                                placeholder='"Your Name"'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-terminal-dim font-mono text-xs mb-2">
                                            <span className="text-terminal-cyan">const</span> email =
                                        </label>
                                        <div className="relative">
                                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-dim" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-terminal-dark border border-terminal-green/30 rounded-lg pl-10 pr-4 py-3 font-mono text-sm text-slate-200 placeholder-terminal-dim/50 focus:border-terminal-green focus:outline-none focus:shadow-terminal transition-all"
                                                placeholder='"your@email.com"'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label className="block text-terminal-dim font-mono text-xs mb-2">
                                        <span className="text-terminal-cyan">const</span> subject =
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-terminal-dark border border-terminal-green/30 rounded-lg px-4 py-3 font-mono text-sm text-slate-200 placeholder-terminal-dim/50 focus:border-terminal-green focus:outline-none focus:shadow-terminal transition-all"
                                        placeholder='"Project Inquiry"'
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label className="block text-terminal-dim font-mono text-xs mb-2">
                                        <span className="text-terminal-cyan">const</span> message = `
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-terminal-dim" />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full bg-terminal-dark border border-terminal-green/30 rounded-lg pl-10 pr-4 py-3 font-mono text-sm text-slate-200 placeholder-terminal-dim/50 focus:border-terminal-green focus:outline-none focus:shadow-terminal transition-all resize-none"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>
                                    <span className="text-terminal-dim font-mono text-xs">`;</span>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    className={`w-full py-3 rounded-lg font-mono font-bold flex items-center justify-center gap-2 transition-all duration-200 ${status === 'success'
                                        ? 'bg-terminal-green/20 border border-terminal-green text-terminal-green'
                                        : status === 'error'
                                            ? 'bg-terminal-red/20 border border-terminal-red text-terminal-red'
                                            : 'bg-terminal-green text-terminal-dark hover:shadow-terminal-lg'
                                        }`}
                                >
                                    {status === 'idle' && (
                                        <>
                                            <Send className="w-4 h-4" />
                                            $ send_message
                                        </>
                                    )}
                                    {status === 'sending' && (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </>
                                    )}
                                    {status === 'success' && (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Message Sent!
                                        </>
                                    )}
                                    {status === 'error' && (
                                        <>
                                            <AlertCircle className="w-4 h-4" />
                                            Error - Retry
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info & Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Terminal Output */}
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-btn terminal-btn-close" />
                                <div className="terminal-btn terminal-btn-minimize" />
                                <div className="terminal-btn terminal-btn-maximize" />
                                <span className="ml-4 text-terminal-dim text-xs font-mono">terminal_output</span>
                            </div>

                            <div className="p-6 font-mono text-sm max-h-[200px] overflow-y-auto">
                                {terminalOutput.map((line, index) => (
                                    <div
                                        key={index}
                                        className={`${line.startsWith('$')
                                            ? 'text-terminal-green'
                                            : line.includes('✓')
                                                ? 'text-terminal-green'
                                                : line.startsWith('ERROR')
                                                    ? 'text-terminal-red'
                                                    : 'text-terminal-dim'
                                            } ${line === '' ? 'h-4' : ''}`}
                                    >
                                        {line}
                                    </div>
                                ))}
                                <span className="text-terminal-green animate-blink">▌</span>
                            </div>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-3">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="matrix-card p-4 flex items-center gap-4"
                                >
                                    <div className="p-2 bg-terminal-green/10 rounded-lg text-terminal-green">
                                        {info.icon}
                                    </div>
                                    <div className="font-mono">
                                        <span className="text-terminal-dim text-xs block">{info.label}:</span>
                                        {info.href ? (
                                            <a
                                                href={info.href}
                                                className="text-terminal-green hover:glow-text-sm transition-all"
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className="text-slate-300">{info.value}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-btn terminal-btn-close" />
                                <div className="terminal-btn terminal-btn-minimize" />
                                <div className="terminal-btn terminal-btn-maximize" />
                                <span className="ml-4 text-terminal-dim text-xs font-mono">social_links.sh</span>
                            </div>

                            <div className="p-4 space-y-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="flex items-center gap-4 p-3 rounded-lg bg-terminal-dark/50 border border-terminal-green/20 hover:border-terminal-green/50 hover:shadow-terminal transition-all group"
                                    >
                                        <span className="text-terminal-green group-hover:glow-text-sm transition-all">
                                            {social.icon}
                                        </span>
                                        <div className="font-mono text-sm">
                                            <span className="text-terminal-green">$</span>
                                            <span className="text-slate-300 ml-2">{social.command}</span>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
