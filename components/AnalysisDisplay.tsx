import React, { useState, useCallback } from 'react';
import type { PromptAnalysis } from '../services/geminiService';
import { InfoIcon } from './icons/InfoIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { WandIcon } from './icons/WandIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';


interface AnalysisDisplayProps {
  analysis: PromptAnalysis;
}

const Card: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode, className?: string }> = ({ icon, title, children, className }) => (
    <div className={`bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex flex-col ${className}`}>
        <div className="flex items-center gap-3 mb-3">
            {icon}
            <h3 className="font-bold text-lg text-slate-200">{title}</h3>
        </div>
        <div className="text-slate-300 text-sm leading-relaxed">
            {children}
        </div>
    </div>
);


export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(analysis.enhancedPrompt);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
    }, [analysis.enhancedPrompt]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
        
        {/* Left Column: Analysis */}
        <div className="flex flex-col gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-300">Identified Task Type</h3>
                    <span className="px-3 py-1 text-sm font-medium text-purple-300 bg-purple-900/50 rounded-full border border-purple-700">{analysis.taskType}</span>
                </div>
            </div>

            <Card
                icon={<InfoIcon className="w-6 h-6 text-cyan-400" />}
                title="Recommended Tool"
            >
                <p className="font-semibold text-cyan-300 text-base mb-1">{analysis.toolSuggestion.category}</p>
                <p>{analysis.toolSuggestion.reasoning}</p>
            </Card>

            <Card
                icon={<LightbulbIcon className="w-6 h-6 text-amber-400" />}
                title="Prompting Feedback"
            >
                <ul className="space-y-2 list-disc list-inside">
                    {analysis.promptFeedback.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </Card>
        </div>

        {/* Right Column: Enhanced Prompt */}
        <Card
            icon={<WandIcon className="w-6 h-6 text-purple-400" />}
            title="Enhanced Prompt"
            className="lg:col-span-1"
        >
            <div className="flex flex-col h-full">
                <p className="flex-grow bg-slate-800/70 p-4 rounded-md border border-slate-700/50 font-mono text-sm whitespace-pre-wrap">
                    {analysis.enhancedPrompt}
                </p>
                <button
                    onClick={handleCopy}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-purple-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    {isCopied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
                    {isCopied ? 'Copied to Clipboard!' : 'Copy Prompt'}
                </button>
            </div>
        </Card>
    </div>
  );
};