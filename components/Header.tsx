
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center w-full max-w-4xl">
      <div className="flex items-center justify-center gap-4 mb-4">
        <SparklesIcon className="w-10 h-10 text-sky-400" />
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400">
          AI Prompt Engineer
        </h1>
      </div>
      <p className="text-lg md:text-xl text-slate-400">
        Transform your ideas into powerful AI prompts. Describe your goal, and we'll craft the perfect prompt and suggest the best tools.
      </p>
    </header>
  );
};
