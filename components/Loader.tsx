import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-slate-400">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-purple-400/30 rounded-full animate-ping"></div>
        <div className="absolute inset-2 border-2 border-cyan-400/50 rounded-full animate-pulse"></div>
        <div className="absolute inset-4 flex items-center justify-center text-cyan-400">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
        </div>
      </div>
      <p className="font-semibold tracking-wider">ANALYZING PROMPT ...</p>
    </div>
  );
};