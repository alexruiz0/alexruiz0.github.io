import React from 'react';

const CreativeLoader: React.FC = () => {
    return (
        <div className="min-h-screen bg-terminal-darker flex items-center justify-center">
            <div className="text-center">
                <div className="text-terminal-green font-mono text-2xl animate-pulse">
                    Initializing...
                </div>
            </div>
        </div>
    );
};

export default CreativeLoader;
