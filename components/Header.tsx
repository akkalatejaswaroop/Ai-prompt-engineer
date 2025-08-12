import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-6 px-4 border-b border-slate-800/50">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
        AI Prompt Engineer
      </h1>
      <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
        Turn your ideas into powerful, effective prompts for any AI tool.
      </p>
    </header>
  );
};