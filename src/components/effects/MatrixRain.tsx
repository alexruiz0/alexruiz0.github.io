import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Matrix characters - mix of katakana, numbers, and symbols
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/*-+!@#$%^&()';
        const charArray = chars.split('');

        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);

        // Array to store drop positions
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        // Colors for the matrix effect - terminal green with variations
        const colors = [
            'rgba(0, 255, 65, 1)',    // Bright green
            'rgba(0, 255, 65, 0.8)',
            'rgba(0, 255, 65, 0.6)',
            'rgba(0, 200, 50, 0.9)',
            'rgba(100, 255, 100, 0.7)',
        ];

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = charArray[Math.floor(Math.random() * charArray.length)];

                // Calculate y position
                const y = drops[i] * fontSize;

                // Draw the leading character (brightest)
                if (y > 0) {
                    // Glow effect for leading character
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#00ff41';
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(char, i * fontSize, y);

                    // Reset shadow for trailing characters
                    ctx.shadowBlur = 0;
                }

                // Draw trailing character with random green
                const trailChar = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.fillText(trailChar, i * fontSize, y - fontSize);

                // Reset drop to top randomly
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Move drop
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 35);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.15 }}
        />
    );
};

export default MatrixRain;
