/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // Terminal/Hacker theme colors
                'terminal': {
                    'green': '#00ff41',       // Matrix green
                    'dim': '#0a5f1c',         // Dimmed green
                    'dark': '#0d1117',        // Dark background
                    'darker': '#010409',      // Darker background
                    'cyan': '#00d9ff',        // Cyan accent
                    'amber': '#ffb000',       // Warning/amber
                    'magenta': '#ff0080',     // Magenta for glitch
                    'red': '#ff3333',         // Error red
                },
                // Legacy support - mapping to terminal theme
                'slate': {
                    950: '#010409',
                    900: '#0d1117',
                    800: '#161b22',
                    700: '#21262d',
                    600: '#30363d',
                    500: '#484f58',
                    400: '#6e7681',
                    300: '#8b949e',
                    200: '#c9d1d9',
                    100: '#f0f6fc',
                },
                'gray': {
                    950: '#010409',
                    900: '#0d1117',
                    800: '#161b22',
                    700: '#21262d',
                    600: '#30363d',
                    500: '#484f58',
                    400: '#6e7681',
                    300: '#8b949e',
                    200: '#c9d1d9',
                    100: '#f0f6fc',
                },
                // Map emerald to terminal green for legacy support
                'emerald': {
                    50: '#e6fff0',
                    100: '#b3ffcc',
                    200: '#80ffa8',
                    300: '#4dff85',
                    400: '#1aff61',
                    500: '#00ff41',
                    600: '#00cc34',
                    700: '#009927',
                    800: '#00661a',
                    900: '#00330d',
                },
                'accent': {
                    DEFAULT: '#00ff41',
                    light: '#4dff85',
                    dark: '#00cc34',
                    muted: 'rgba(0, 255, 65, 0.15)',
                },
            },
            fontFamily: {
                'display': ['Inter', 'system-ui', 'sans-serif'],
                'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-right': 'slideRight 0.5s ease-out',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'flicker': 'flicker 0.15s infinite',
                'scanline': 'scanline 8s linear infinite',
                'glitch': 'glitch 0.3s ease-in-out',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
                'matrix-fall': 'matrixFall 10s linear infinite',
                'blink': 'blink 1s step-end infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideRight: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                flicker: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' },
                },
                glitch: {
                    '0%, 100%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                },
                glow: {
                    '0%': {
                        textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
                        boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41',
                    },
                    '100%': {
                        textShadow: '0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px #00ff41',
                        boxShadow: '0 0 20px #00ff41, 0 0 30px #00ff41',
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                typing: {
                    'from': { width: '0' },
                    'to': { width: '100%' },
                },
                'blink-caret': {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: '#00ff41' },
                },
                matrixFall: {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { transform: 'translateY(100vh)', opacity: '0' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'card': '0 4px 20px rgba(0, 0, 0, 0.25)',
                'card-hover': '0 8px 40px rgba(0, 0, 0, 0.35)',
                'terminal': '0 0 10px rgba(0, 255, 65, 0.3), 0 0 20px rgba(0, 255, 65, 0.1)',
                'terminal-lg': '0 0 20px rgba(0, 255, 65, 0.4), 0 0 40px rgba(0, 255, 65, 0.2)',
                'terminal-glow': 'inset 0 0 20px rgba(0, 255, 65, 0.1), 0 0 30px rgba(0, 255, 65, 0.2)',
            },
            backgroundImage: {
                'terminal-gradient': 'linear-gradient(180deg, rgba(0, 255, 65, 0.1) 0%, transparent 50%)',
                'grid-pattern': `
          linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)
        `,
            },
        },
    },
    plugins: [],
};
