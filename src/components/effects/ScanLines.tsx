import React from 'react';

const ScanLines: React.FC = () => {
    return (
        <>
            {/* CRT Scanlines */}
            <div
                className="fixed inset-0 pointer-events-none z-50"
                style={{
                    background: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15) 0px,
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          )`,
                }}
            />

            {/* Subtle vignette effect */}
            <div
                className="fixed inset-0 pointer-events-none z-40"
                style={{
                    background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.4) 100%
          )`,
                }}
            />

            {/* Occasional screen flicker */}
            <div
                className="fixed inset-0 pointer-events-none z-30 animate-flicker"
                style={{
                    background: 'rgba(0, 255, 65, 0.02)',
                }}
            />
        </>
    );
};

export default ScanLines;
